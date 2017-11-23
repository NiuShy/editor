<template>
  <div class="mri-warp">
    <div class="content-head">
      <div style="flex: 1">

      </div>

      <div style="flex: 3;padding-left: 20px;">
        <label>时间都拿手机的</label>
        <i class="fa fa-save" style="float: right"></i>
        <i class="fa fa-save" style="float: right"></i>
        <i class="fa fa-save" style="float: right"></i>
        <i class="fa fa-save" style="float: right"></i>
      </div>
    </div>
    <div class="mri-content">
      <div class="mri-view"></div>
      <div class="tree-view">
        <v-jstree :data="treeData" wholeRow  ></v-jstree>
      </div>
      <div class="editor-view">
        <json-editor v-model="json"  height="100%" lang="json" theme="monokai" @init="initEditor"></json-editor>
      </div>
    </div>


  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import JsonEditor from  "vue2-ace-editor"
import VJstree from 'vue-jstree'

export default {
  name: 'HelloWorld',
  data () {
    return {
      json:JSON.stringify({
          "aaa":4444,
        "bbb":[
          {
            "text": "custom icon",
            "icon": "fa fa-warning icon-state-warning"
          },
          {
            "text": "disabled node",
            "icon": "fa fa-check icon-state-success",
          }
        ]
      },null, 4),
      treeData:[
          {
            "text": "Same but with checkboxesSame but with checkboxesSame but with checkboxes",
            "icon":"fa fa-folder-o",
            "opened":true,
            "children": [
              {
                "text": "initially selected",
                "icon":"fa fa-file-text-o",
              },
              {
                "text": "custom icon",
                "icon": "fa fa-file-text-o"
              },
              {
                "text": "initially open",
                "icon": "fa fa-folder-o",
                "opened":true,
                "children": [
                  {
                    "text": "Another node",
                    "icon":"fa fa-file-text-o",
                  }
                ]
              },
              {
                "text": "custom icon",
                "icon":"fa fa-file-text-o"
              },
              {
                "text": "disabled node",
                "icon": "fa fa-file-text-o",
              }
            ]
          }]


    }
  },
  methods:{
    initEditor:function (editor) {
      require('brace/mode/json');
      require('brace/theme/monokai');
    }
  },
  components: {
    VJstree,
    JsonEditor
  }
}
</script>

<style >
.mri-content{
  height: 500px;
  display: flex;

}
.mri-warp .content-head{
  height: 30px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  vertical-align: middle;
  display: flex;
}
.mri-content>div{
  border: 1px solid #e6ebf5;

  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

}
.mri-content .mri-view{
  flex: 1;
  padding: 10px;
}
.mri-content .tree-view{
  flex: 1;
  overflow: hidden;
  overflow-x: scroll;
  padding: 10px;
 }
.mri-content .editor-view{
  flex: 2;
}

</style>
