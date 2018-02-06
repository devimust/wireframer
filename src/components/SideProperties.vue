<template>
  <div class="container" :style="{width: containerWidth + 'px' }">
    <div class="open-close">
      <i v-if="containerOpen" class="material-icons" @click="toggleContainerState">chevron_right</i>
      <i v-if="!containerOpen" class="material-icons" @click="toggleContainerState">chevron_left</i>
    </div>

    <div v-if="containerOpen" class="row">
      <div class="col-sm">
        <h2>pages <span data-tip="add new page"><i class="add-page material-icons" @click="createPage">add_circle</i></span></h2>

        <table class="page-table">
          <tr v-for="(page, index) in pages" :key="page.id">
            <td @click="setActivePage(page)">
              <vue-editable
                class="page-name-edit"
                :class="{'active': activePage && page.id === activePage.id}"
                :content="page.name"
                :page="page"
                @changed="changePageName"
              ></vue-editable>
            </td>
            <td class="clearfix">
              <i v-if="index != 0" @click="moveUp(page)" class="material-icons float-left">arrow_drop_up</i>
              <span v-else>&nbsp;</span>
            </td>
            <td class="clearfix">
              <i v-if="index != (pages.length-1)" @click="moveDown(page)" class="material-icons float-left">arrow_drop_down</i>
              <span v-else>&nbsp;</span>
            </td>
            <td class="clearfix">
              <i @click="deletePage(page)" class="delete-page float-right material-icons">close</i>
            </td>
          </tr>
        </table>

        <div v-if="activeWidget" class="widget-properties">
          <h2>properties</h2>

          <div class="widget-actions clearfix">
            <i class="material-icons float-left" @click="sendWidget('back')">flip_to_back</i>
            <i class="material-icons float-left" @click="sendWidget('front')">flip_to_front</i>
            <i v-if="showJustification" class="material-icons float-left" @click="justifyWidget('left')">format_align_left</i>
            <i v-if="showJustification" class="material-icons float-left" @click="justifyWidget('center')">format_align_center</i>
            <i v-if="showJustification" class="material-icons float-left" @click="justifyWidget('right')">format_align_right</i>
            <i class="delete-widget material-icons float-right" @click="deleteWidget">close</i>
          </div>

          <!-- dimensions -->
          <div class="widget-actions-2 form-group">
            <div>
              <input type="text" class="form-control" v-model="activeWidget.w">
            </div>
            <label> by </label>
            <div>
              <input type="text" class="form-control" v-model="activeWidget.h">
            </div>
          </div>

          <!-- label -->
          <div v-if="showText" class="form-group">
            <label for="inputText1">label text</label>
            <input type="text" class="form-control" id="inputText1" placeholder="label text"
              v-model="activeWidget.t" @input="debounceTextInput">
          </div>

          <!-- color -->
          <div v-if="showColor" class="form-group text-color">
            <label for="inputColor1">color</label>
            <input type="text" class="form-control" id="inputColor1"
              v-model="activeWidget.c">
          </div>
          <div v-if="showColor" class="form-group color-picker">
            <vue-color-picker @changed="pickColor"></vue-color-picker>
          </div>

          <!-- bg color -->
          <div v-if="showBgColor" class="form-group text-color">
            <label for="inputColor2">background color</label>
            <input type="text" class="form-control" id="inputColor2"
              v-model="activeWidget.bc">
          </div>
          <div v-if="showBgColor" class="form-group color-picker">
            <vue-color-picker @changed="pickBgColor"></vue-color-picker>
          </div>

          <!-- font size -->
          <div v-if="showFontSize" class="form-group clearfix">
            <div>
              <label>heading size</label>
            </div>
            <i v-if="activeWidget.f < 50" class="material-icons float-left" @click="activeWidget.f=parseInt(activeWidget.f)+5">add</i>
            <i v-if="activeWidget.f > 20" class="material-icons float-left" @click="activeWidget.f=parseInt(activeWidget.f)-5">remove</i>
          </div>

          <!-- image url -->
          <div v-if="showImageUrl" class="form-group">
            <label for="imageURL">image url</label>
            <input type="text" class="form-control" id="imageURL" placeholder="http://"
              v-model="activeWidget.l" @input="debounceTextInput">
          </div>

          <!-- radio list items -->
          <div v-if="showRadioCheckbox" class="form-group radio-list">
            <label>list</label>

            <i class="material-icons add-item"
              @click="activeWidget.d.push({n:'item',c:false})">add_circle</i>

            <table>
              <tr v-for="(item, index) in activeWidget.d" :key="index">
                <td width="20"><i class="material-icons">chevron_right</i></td>
                <td width="20" align="right"><input type="checkbox" v-model="item.c"></td>
                <td><input id="text" type="text" v-model="item.n" @input="debounceTextInput"></td>

                <td width="20" align="right"><i class="material-icons" @click="activeWidget.d.splice(index, 1)">close</i></td>
              </tr>
            </table>
          </div>

          <!-- list items -->
          <div v-if="showList" class="form-group list">
            <label>list</label>

            <i class="material-icons add-item"
              @click="activeWidget.d.push({n:'item'})">add_circle</i>

            <table>
              <tr v-for="(item, index) in activeWidget.d" :key="index">
                <td width="20"><i class="material-icons">chevron_right</i></td>
                <td><input id="text" type="text" v-model="item.n" @input="debounceTextInput"></td>
                <td width="20" align="right"><i class="material-icons" @click="activeWidget.d.splice(index, 1)">close</i></td>
              </tr>
            </table>
          </div>

          <!-- shape -->
          <div v-if="showShape" class="widget-actions-2 form-group">
            <label>shape</label>
            <select v-model="activeWidget.s">
              <option>rectangle</option>
              <option>circle</option>
            </select>
          </div>
        </div>

        <div class="bottom-holder">
          <div v-if="showImportFile" class="upload-json-file">
            <p>import json file</p>
            <input type="file" id="uploadJsonFile" @change="uploadJsonFile">
          </div>

          <div>
            <span data-tip="export png">
              <i v-if="activePage" class="material-icons" @click="exportCanvasToFile">save</i>
            </span>

            <span data-tip="export data">
              <i class="material-icons vtooltip" @click="exportLocalstorageToJsonFile">file_download</i>
            </span>

            <span data-tip="import file">
              <i class="material-icons" @click="showImportFile=!showImportFile">file_upload</i>
            </span>
          </div>
        </div>

        <div class="app-version">v {{ version }}</div>

        <!-- <div>
          <pre style="color:white;">{{ activeWidget }}</pre>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

  import VueEditable from '../helpers/vue-editable.vue'
  import VueColorPicker from '../helpers/vue-color-picker.vue'
  import html2canvas from 'html2canvas'
  import { version } from '../../package.json'

  export default {
    data () {
      return {
        containerOpen: true,
        showImportFile: false,
        version: version
      }
    },

    methods: {
      createPage () {
        this.$store.dispatch('createPage', {
          name: 'New Page'
        })
      },

      deletePage (page) {
        this.$store.dispatch('deletePage', page)
      },

      changePageName (page, name) {
        this.$store.dispatch('savePageName', {
          page,
          name
        })
      },

      moveUp (page) {
        this.$store.dispatch('updatePageOrder', {
          page,
          direction: 'up'
        })
      },

      moveDown (page) {
        this.$store.dispatch('updatePageOrder', {
          page,
          direction: 'down'
        })
      },

      setActivePage(page) {
        this.$store.dispatch('setActiveWidget', null)
        this.$store.dispatch('setActivePage', page)
      },

      createWidget (type) {
        this.$store.dispatch('createWidget', 'button')
      },

      toggleContainerState () {
        const containerState = !this.containerOpen
        this.containerOpen = containerState

        localStorage.setItem('sidePropertiesState', containerState)
      },

      debounceTextInput: _.debounce(function (e) {
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      }, 200),

      debounceColorInput: _.debounce(function (e) {
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      }, 200),

      sendWidget (direction) {
        if (direction == 'front') {
          if (this.activeWidget.z >= 100) {
            return;
          }

          this.activeWidget.z += 10
        } else {
          if (this.activeWidget.z <= 0) {
            return;
          }

          this.activeWidget.z -= 10
        }

        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      },

      justifyWidget (direction) {
        this.activeWidget.a = direction
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      },

      deleteWidget () {
        this.$store.dispatch('deleteWidget')
      },

      pickColor (val) {
        this.activeWidget.c = '#' + val
      },

      pickBgColor (val) {
        this.activeWidget.bc = '#' + val
      },

      exportCanvasToFile () {
        if (!this.activePage) {
          return
        }

        // @link https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas
        html2canvas(document.querySelector("#widget-holder")).then(canvas => {
          var anchor = document.createElement('a')
          anchor.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")
          anchor.download = this.activePage.name + '.jpg'
          anchor.click()
        })
      },

      exportLocalstorageToJsonFile () {
        const pagesObj = this.$store.getters.pages

        const today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        const fileName = yyyy + '_' + mm + '_' + dd

        var anchor = document.createElement('a')
        anchor.href = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(pagesObj))
        anchor.download = 'wireframer_' + fileName + '.json'
        anchor.click()
      },

      uploadJsonFile (e) {
        var files = e.target.files || e.dataTransfer.files;

        if (!files.length || files.length != 1) {
          return
        }

        const file = files[0]
        var reader = new FileReader()
        var vm = this;

        reader.onload = (e) => {
          vm.$store.dispatch('loadPagesFromFileImport', e.target.result)
        }

        reader.readAsText(file);
      }
    },

    computed: {
      pages () {
        return this.$store.getters.pages
      },

      activePage () {
        return this.$store.getters.activePage
      },

      containerWidth () {
        let width = 290
        if (!this.containerOpen) {
          width = 32
        }
        return width
      },

      activeWidget () {
        const widget = this.$store.getters.activeWidget

        if (!widget) {
          return null
        }

        return widget
      },

      showText () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['button', 'dropdown', 'input', 'heading', 'label', 'browser']

        return allowed.includes(this.activeWidget.type)
      },

      showColor () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['heading', 'label', 'hr', 'input']

        return allowed.includes(this.activeWidget.type)
      },

      showBgColor () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['button', 'label', 'input', 'image', 'shape', 'browser', 'mobile']

        return allowed.includes(this.activeWidget.type)
      },

      showJustification () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['button', 'checkbox', 'dropdown', 'input', 'heading', 'label']

        return allowed.includes(this.activeWidget.type)
      },

      showRadioCheckbox () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['radio', 'checkbox']

        return allowed.includes(this.activeWidget.type)
      },

      showImageUrl () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['image']

        return allowed.includes(this.activeWidget.type)
      },

      showList () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['list']

        return allowed.includes(this.activeWidget.type)
      },

      showFontSize () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['heading']

        return allowed.includes(this.activeWidget.type)
      },

      showShape () {
        if (!this.activeWidget) {
          return false
        }

        const allowed = ['shape']

        return allowed.includes(this.activeWidget.type)
      }
    },

    watch: {
      'activeWidget.c': function (val, oldVal) {
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      },
      'activeWidget.bc': function (val, oldVal) {
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      },
      'activeWidget.d': {
        handler (val) {
          this.$store.dispatch('updateWidgetProperties', this.activeWidget)
        },
        deep: true
      },
      'activeWidget.w': function (val, oldVal) {
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      },
      'activeWidget.h': function (val, oldVal) {
        this.$store.dispatch('updateWidgetProperties', this.activeWidget)
      }
    },

    created () {
      const containerState = localStorage.getItem('sidePropertiesState')

      if (!containerState) {
        return
      }

      this.containerOpen = JSON.parse(containerState)

      const activePageId = localStorage.getItem('activePage')
      if (!this.activePage && activePageId && this.pages.length > 0) {
        const page = this.pages.find(item => item.id == activePageId)

        if (page) {
          this.$store.dispatch('setActivePage', page)
        }
      }
    },

    components: {
      'vue-editable': VueEditable,
      'vue-color-picker': VueColorPicker
    }
  }

</script>

<style lang="scss" scoped>

  @import '../styles/_main.scss';

  .container {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background-color: $sidebar-background-color;
    z-index: 1001;
    color: $sidebar-color;
  }

  .open-close {
    position: absolute;
    top: 20px;
    right: 5px;
    color: $sidebar-color;
    z-index: 1;
    cursor: pointer;
  }

  .row {
    padding-top: 10px;

    h2 {
      margin: 10px 0 15px 0;
      position: relative;
    }

    .add-page {
      cursor: pointer;
      color: $sidebar-icon-color-primary;
      margin-left: 10px;
      position: absolute;
    }

    .delete-page {
      color: $sidebar-danger;
      margin-left: 5px;
    }

    .page-table {
      width: 100%;

      .page-name-edit {
        background-color: $sidebar-background-color;
        color: $sidebar-color;
        border: none;
        height: 26px;

        &.active {
          border-bottom: 1px solid $sidebar-icon-color-primary;
        }
      }

      .page-name-edit:focus {
        outline: none !important;
      }

      i {
        cursor: pointer;
        font-size: $small-icon-size;
      }
    }

    .widget-properties {
      margin-top: 30px;

      i {
        cursor: pointer;
        font-size: $large-icon-size;
        margin-right: 5px;
      }

      .widget-actions .delete-widget {
        color: $sidebar-danger;
        font-size: $small-icon-size;
        position: relative;
        top: 5px;
        margin-right: 0;
      }

      .widget-actions-2 {
        div {
          background-color: red;
          display: inline-block;
          width: 40px;
          padding: 0;
        }

        input[type="text"] {
          display: inline-block;
        }

        label {
          margin: 0 10px 0 10px;
        }
      }

      .form-group {
        margin-top: 15px;
      }

      .text-color {
        width: 140px;
      }

      .color-picker ul {
        position: relative;
        top: -10px;
      }

      .radio-list, .list {
        table {
          width: 100%;
        }

        input[type=text] {
          background-color: $sidebar-background-color;
          color: $sidebar-color;
          border: none;
          height: 26px;

          &.active {
            border-bottom: 1px solid $sidebar-icon-color-primary;
          }
        }

        input[type="checkbox"] {
          width: 30px;
          position: relative;
          top: 3px;
        }

        i {
          cursor: pointer;
          font-size: $small-icon-size;
          color: $sidebar-icon-color-primary;
          position: relative;
          top: 3px;

          &.add-item {
            margin-left: 5px;
          }
        }
        input {
          width: 100px;
        }
      }
    }

    .bottom-holder {
      position: fixed;
      bottom: 5px;
      cursor: pointer;

      .upload-json-file {
        margin-bottom: 15px;

        p {
          margin-bottom: 5px;
        }
      }
    }

    .app-version {
      position: fixed;
      bottom: 5px;
      right: 10px;
    }
  }

</style>
