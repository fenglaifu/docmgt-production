<template>
    <div class="app-container">
      <div class="btn-container">
        <!-- 新增按钮 -->
        <router-link to="/worknotice/worknoticeAdd">
          <el-button type="success" icon="el-icon-edit">新增</el-button>
        </router-link>
      </div>
       <el-table
        v-loading="loading"
        :data="list"
        border
        fit=false
        stripe
        highlight-current-row
        style="width: 100%"
      >
        <!-- <el-table-column align="center" label="ID" prop="id"></el-table-column> -->
        <el-table-column align="center" label="标题" prop="title">
        </el-table-column>
        <el-table-column align="center" label="通知内容" prop="content">
        </el-table-column>
        <el-table-column align="center" label="日期" prop="createDate">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              @click="handleView(scope)"
              >内容详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page="listQuery.curPage"
        :limit="listQuery.pageSize"
        @pagination="getDataList"
      ></pagination>  
    </div>
</template>

<script lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import Pagination from '../../../src/components/Pagination.vue';
import { WorkNoticeModelData } from './model/worknoticeModel';
export default {
  name: "Worknoticelist",
  components: {
    Pagination,
  },
  setup() {
    
    const router = useRouter();
    const {state, getDataList} = WorkNoticeModelData();

    // 查看详情
    function handleView({row}) {
      router.push({
        name: "worknoticedetail",
        params: { id: row.id },
      });
    }

    return {
      ...toRefs(state),
      handleView,
      getDataList
    };
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>