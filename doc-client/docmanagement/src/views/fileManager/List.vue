<template>
  <div class="content">
    <h1>File List</h1>
    <MySpreadJS :mySpread="mySpread"></MySpreadJS>
  </div>
</template>
<script lang = "ts">
import MySpreadJS from "../../components/SpreadJS.vue";
import axios from "axios"
export default {
  name: "List",
  components: { MySpreadJS },
  data() {
    return {
      mySpread: ""
    };
  },
  mounted() {
  },
  methods: {
    getFile(name) {
      const service = axios.create({
          baseURL: "http://localhost:4000/api",
          timeout: 5000
      });
      service.post('/loadExcels/as', { responseType: "blob" })
      .then(response => {
          this.mySpread = response;
        })/* .then(result => {
            console.log(result)
            let blobdata = new Blob([result], { type: "application/vnd.oasis.opendocument.spreadsheet;charset=utf-8" });
            let excelIO = new GC.Spread.Excel.IO();
            let excelFile = '/public/OA系统人员信息.xls';
            excelIO.open(blobdata, function (json) {
                var workbookObj = json;
                console.log('workbookObj')
                console.log(workbookObj)
                workbook.fromJSON(workbookObj);
            }, function (e) {
                console.log(e);
            });
            
        }) */.catch(error => {
            console.log("error")
            console.log(error)
        })
    },
  }
};
</script>
<style >
.content {
  padding: 50px;
}
.bluefont {
  color: blue;
}
.bluefont:hover {
  text-decoration: underline;
}
.filecontent {
  display: flex;
  flex-wrap: wrap;
}
.content-list {
  padding: 10px;
}
.active {
  background-color: rgb(204, 232, 255);
}
.iconfont {
  height: 50px;
  width: 70px;
}
.filename {
  width: 70px;
  text-align: center;
  font-size: 12px;
  color: #555;
}
.file-detail {
  width: 200px;
  border-left: 1px solid rgb(222, 222, 222);
  height: 300px;
  padding-left: 10px;
  font-size: 12px;
  color: #555;
}
.el-dialog__body {
  padding: 0 20px;
}
</style>