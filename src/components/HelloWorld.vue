<template>
  <div class="mri-warp">
    <div class="content-head">
      <div   class="head-left">
      </div>
      <div   class="head-right">
        <label>时间都拿手机的</label>
        <button class="icon-btn">
          <i class=" fa fa-save"  ></i>
        </button>
        <button class="icon-btn">
          <i class=" fa fa-save"  ></i>
        </button>
        <button class="icon-btn">
          <i class=" fa fa-save"  ></i>
        </button>

      </div>
    </div>
    <div class="mri-content">
      <div class="mri-view" id="mri">
        <iframe style="width: 100%;height: 100%;border: none;" src="https://m.baidu.com"></iframe>
      </div>
      <div class="tree-view" id="tree">
        <v-jstree :data="treeData" wholeRow  ></v-jstree>
      </div>
      <div class="editor-view" id="editor">
        <json-editor v-model="json"  height="100%" lang="json" theme="monokai" @init="initEditor"></json-editor>
      </div>
    </div>


  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import JsonEditor from  "vue2-ace-editor"
import VJstree from 'vue-jstree'
import Split from 'split.js'
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
              },{
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
  created:function(){
    this.axios.get("https://api.github.com/repos/NiuShy/editor/contents")
            .then(function(response) {
              console.log(response.data);
            });


  },
  methods:{
    initEditor:function (editor) {
      require('brace/mode/json');
      require('brace/theme/monokai');
    }
  },
  mounted:function(){
    Split(['#tree', '#editor'], {
      sizes: [25, 75]
    })
  },
  components: {
    VJstree,
    JsonEditor
  }
}
</script>

<style >
.mri-content{
  height: 700px;
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
.mri-warp .content-head .head-left{
  width: 420px;
}
.mri-warp .content-head .head-right{
  width: calc(100% - 70px);
 }
.mri-warp .content-head .head-right .icon-btn{
  float: right;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  border: 1px solid #d8dce5;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;
}
.mri-warp .content-head .head-right .icon-btn:hover{
  opacity: .8;
  filter:alpha(opacity=80);
}
.mri-warp .content-head .head-right .icon-btn:active{
  opacity: 1;
  filter:alpha(opacity=100);
}
.mri-content>div{
  border: 1px solid #e6ebf5;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.mri-content .mri-view{
  width: 420px;
  padding: 10px;
}
.mri-content .tree-view{
 /*flex: 1;*/
  overflow: hidden;
  overflow-x: scroll;
  overflow-y: scroll;
  padding: 10px;
 }
.mri-content .editor-view{
  /*flex: 2;*/
}
  .gutter.gutter-horizontal{
    border: none;
    cursor: w-resize;
  }
</style>
