<template>
  <div class="mri-warp">
    <div class="content-head">
      <div   class="head-left">
        <el-select v-model="value6" placeholder="请选择">
          <el-option
                  v-for="item in cities"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" style="height: 50px;">
            <span  >{{ item.label }}</span><br>
            <span style="  color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </div>
      <div   class="head-right">
        <label>Json编辑器</label>
        <el-button-group style="float: right;" >
          <el-tooltip class="item" effect="light" content="保存" placement="top-start">
            <el-button type="primary" size="small" >
              <i class="fa fa-save"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="保存" placement="top-start">
            <el-button type="primary" size="small" icon="share"></el-button>
          </el-tooltip>
          <el-button type="primary" size="small" icon="delete"></el-button>
        </el-button-group>

      </div>
    </div>
    <div class="mri-content">
      <div class="mri-view" id="mri">
        <iframe style="width: 100%;height: 100%;border: none;" src="https://m.baidu.com"></iframe>
      </div>
      <div class="tree-view" id="tree">
        <v-jstree :data="treeData" wholeRow @item-click="itemClick"  :multiple="false"   ref='tree'></v-jstree>
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
import { Base64 } from 'js-base64'
import _ from "lodash"

export default {
  name: 'HelloWorld',
  data () {
    return {
      gitUrl:"https://api.github.com/repos/NiuShy/editor/contents/",
      json:"",
      treeData:[],
      cities: [{
        value: '000000001',
        label: '测试用户01'
      }, {
        value: '000000001',
        label: '测试用户01'
      }, {
        value: '000000001000000001000000001',
        label: '测试用户01'
      }, {
        value: '000000001',
        label: '测试用户01'
      }, {
        value: '000000001',
        label: '测试用户01'
      }, {
        value: '000000001',
        label: '测试用户01'
      }],
      value6: ''
    }
  },
  mounted() {
    this.list = this.states.map(item => {
              return { value: item, label: item };
    });
  },
  methods:{
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        this.options4 = this.list.filter(item => {
                  return item.label.toLowerCase()
                          .indexOf(query.toLowerCase()) > -1;
      });
      }, 200);
      } else {
        this.options4 = [];
      }
    },
    initEditor:function (editor) {
      require('brace/mode/json');
      require('brace/theme/monokai');
    },
    itemClick:function(node,item){

     this.loadTreeNode(node,item);

    },

    loadTreeNode:function(node,item){
      var this_ = this;
      if(!item){
        this_.axios.get(this_.gitUrl)
          .then(function(response) {

            var list = response.data.map(function(item){
              item.text = item.name;
              item.icon = "fa fa-folder-o";
              if(item.type == 'file'){
                item.icon = "fa fa-file-text-o";
              }
              item.opened = true;
              return item;
            })

            this_.treeData = list;

          }).catch(function(e){
              alert(e)
          });
      }else{

        this_.axios.get(this_.gitUrl+item.path)
          .then(function(response) {
            if(response.data){
              if(item.type== "dir"){
                var list = response.data.map(function(item){
                  item.text = item.name;
                  item.icon = "fa fa-folder-o";
                  if(item.type == 'file'){
                    item.icon = "fa fa-file-text-o";
                  }
                  item.opened = true;
                  return item;
                });

                this_.$set(item,"children",list);
                this_.handleSelected(this_.$refs.tree.model,node)
              }else{
                this_.handleSelected(this_.$refs.tree.model,node)
                this_.json = Base64.decode(response.data.content)
              }
            }
          });

      }
    },
    /**
     * 解决树形插件选择问题
     */
    handleSelected:function(data,item){
      if (data.children && data.children.length > 0) {
        for (let childNode of data.children) {
          if (!childNode.disabled) {
            childNode.model.selected= false
            this.handleSelected(childNode)
          }
        }
      }
      item.model.selected= true;
    }


  },
  mounted:function(){
    Split(['#tree', '#editor'], {
      sizes: [25, 75]
    })
    this.loadTreeNode();
  },
  components: {
    VJstree,
    JsonEditor
  }
}
</script>

<style  >
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
