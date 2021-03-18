<template>
  <div class="mySpread">
    <!-- <div>
      <el-button type="primary" size="small" @click="save">修 改</el-button>
      <el-button type="primary" size="small" @click="dele">删 除</el-button>
    </div> -->
    <div class="spreadContainer">
      <gc-spread-sheets hostClass="spreadHost" @workbookInitialized="spreadInitHandle($event)"></gc-spread-sheets>
    </div>
  </div>
</template>
<style >
.spreadHost {
  height: 300px;
}
</style>
<script lang="ts">
import "@grapecity/spread-sheets-vue";
import * as GC from "@grapecity/spread-sheets";
import ExcelIO from "@grapecity/spread-excelio";
/* import httpUtils from "@/common/utils/HttpUtils"; */
/* import { Notification } from "element-ui"; */
import  "@grapecity/spread-sheets-print";
import  "@grapecity/spread-sheets-pdf";
import  "@grapecity/spread-sheets-charts";
import  "@grapecity/spread-sheets-shapes";
export default {
  name: "MySpreadJS",
  props: {
    mySpread: Blob,
    filePath: String,
    closeSpread: Boolean,
  },
  data() {
    return {
      spread: {},
      spreadblob: this.mySpread
    };
  },
  mounted() {},
  methods: {
    spreadInitHandle: function(spread) {
      this.spread = spread;
      let self = this;
      let excelIO = new ExcelIO.IO();
      excelIO.open(
        this.spreadblob as Blob,
        function(json) {
          let workbookObj = json;
          self.spread.fromJSON(workbookObj);
        },
        function(e) {
          alert(e.errorMessage);
        }
      );
    }

}
}
</script>