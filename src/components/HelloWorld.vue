<template>
  <div class="mri-warp">
    <div class="content-head">
      <div   class="head-left"  >
        <el-select v-model="value6" placeholder="请选择" size="small" style=" width: calc(100% - 180px);padding: 3px;">
          <el-option
                  v-for="item in cities"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" style="height: 50px;">
            <span  >{{ item.label }}</span><br>
            <span style="font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>

        <el-button-group style="float: right;padding-right: 15px" class="btns" >
          <el-tooltip class="item" effect="light" content="停止" placement="top-start">
            <el-button type="primary" size="small" >
              <i class="fa fa-stop"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="启动" placement="top-start">
            <el-button type="primary" size="small">
              <i class="fa fa-play"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="事件" placement="top-start" >
            <el-button type="primary" size="small" @click="dialogFormVisible = true">
              <i class="fa fa-flash"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="重载" placement="top-start">
            <el-button type="primary" size="small" >
              <i class="fa fa-refresh"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" :content="isPackUp?'展开':'收起'" placement="top-start" >
            <el-button type="primary" size="small" v-on:click="packUp()">
              <i :class="isPackUp?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <div   class="head-right">
        <label>Json编辑器</label>
        <el-button-group style="float: right;" class="btns" >
          <el-tooltip class="item" effect="light" content="新建" placement="top-start">
            <el-button type="primary" size="small" icon="plus" @click="editFile(1)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="修改" placement="top-start">
            <el-button type="primary" size="small" icon="edit" @click="editFile(2)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="保存" placement="top-start">
            <el-button type="primary" size="small" >
              <i class="fa fa-save"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="top-start">
            <el-button type="primary" size="small" icon="delete" @click="deleteFile(2)"></el-button>
          </el-tooltip>
        </el-button-group>

      </div>
    </div>
    <div class="mri-content">

      <transition name="slide">
      <div class="mri-view" id="mri" v-show="!isPackUp"  transiton="slide">
        <iframe style="width: 100%;height: 100%;border: none;" :src="mriUrl"></iframe>
      </div>
      </transition>
      <div class="tree-view" id="tree">
        <v-jstree :data="treeData" wholeRow @item-click="itemClick"  ref='tree'></v-jstree>
      </div>
      <div class="editor-view" id="editor">
        <json-editor v-model="json"  height="100%" lang="json" theme="monokai" @init="initEditor"></json-editor>
      </div>
    </div>
    <div class="content-head">
      <div   class="head-left"  >
        <el-date-picker
                class="sys-time"
                v-model="sysTime"
                type="datetime"
                :editable=editable
                placeholder="选择日期时间">
        </el-date-picker>

        <label class="version"  >V1.0 </label>
      </div>
      <div   class="head-right"  ></div>
    </div>


    <el-dialog title="事件" :visible.sync="dialogFormVisible">
        <el-button type="primary" @click="showEventEdit = true" style="float: right;margin-bottom: 10px;">添加事件</el-button>
        <el-table :data="eventList" v-show="!showEventEdit">
          <el-table-column property="name" label="事件名称"  ></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" icon="caret-left">发送</el-button>
              <el-button size="small" icon="edit" @click="showEventEdit = true">编辑</el-button>
              <el-button size="small" type="danger" icon="delete" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="showEventEdit">
          <el-input v-model="eventName" placeholder="请输入事件名称" style="margin-bottom: 20px"></el-input>
          <json-editor v-model="eventJson"  height="200px" lang="json" theme="monokai" @init="initEditor"></json-editor>
        </div>

      <div slot="footer" class="dialog-footer" v-show="showEventEdit">
        <el-button @click="showEventEdit = false">取 消</el-button>
        <el-button type="primary" @click="showEventEdit = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import JsonEditor from  "vue2-ace-editor"
import VJstree from './tree-view/tree.vue'
import Split from 'split.js'
import { Base64 } from 'js-base64'

export default {
  name: 'HelloWorld',
  data () {
    return {
      eventJson:JSON.stringify({"event": {"uri": "","data": {}}},null,'\t'),
      showEventEdit:false,
      eventName:"",
      eventList:[
        {id:1,name:"事件1"},
        {id:2,name:"事件1"},
        {id:3,name:"事件1"},
        {id:4,name:"事件1"},
        {id:5,name:"事件1"},
        {id:6,name:"事件1"},
        {id:7,name:"事件1"}
      ],
      dialogFormVisible: false,
      formLabelWidth: '500px',
      sysTime:"2017-11-11 00:00:00",
      editable:false,
      isPackUp:false,
      mriUrl:"http://sibbay-mri-wept.oss-cn-hangzhou.aliyuncs.com/#!pages/mri-and-menu/mri/mri?userid=000000000000000000000001&server_url=http://101.37.115.57:19999",
      gitUrl:"https://api.github.com/repos/NiuShy/editor/contents/",
      json:"",
      treeData:[],
      cities: [{
        value: '000000001',
        label: '测试用户01'
      }, {
        value: '000000002',
        label: '测试用户01'
      }, {
        value: '000000001000000001000000001',
        label: '测试用户01'
      }, {
        value: '000000003',
        label: '测试用户01'
      }, {
        value: '000000004',
        label: '测试用户01'
      }, {
        value: '000000005',
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
    editFile(type) {
      this.$prompt('请输入文件名', '编辑文件名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
        type: 'success',
        message: '你的邮箱是: ' + value
      });
    }).catch(() => {
        this.$message({
        type: 'info',
        message: '取消输入'
      });
    });
    },
    deleteFile() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
    },
    packUp(){
      this.isPackUp =!this.isPackUp;
    },
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
              }else{
                this_.json = Base64.decode(response.data.content)
                this_.$set(item,"content",this_.json);
              }
            }
            if(this_.$refs.tree.lastNode){
              this_.$refs.tree.lastNode.model.selected=false;
            }
            this_.$refs.tree.lastNode =node;
          }).catch(function(){
              this_.$message({type: 'info',message: 'github api 访问超限'});
           });

      }
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
  height: 36px;
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
.mri-warp .content-head .head-right label{
  line-height: 36px;
}
.mri-warp .content-head  .btns{
  padding: 5px;
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
.slide-enter-active {
  animation: slide-in .5s linear  reverse;
}
.slide-leave-active {
  animation: slide-in .5s linear ;
}
@keyframes slide-in {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: -420px;
  }
}

  .version{
    margin-left: 10px;float:right;line-height: 36px;
  }
  .sys-time input{border: none;cursor: pointer}
</style>
