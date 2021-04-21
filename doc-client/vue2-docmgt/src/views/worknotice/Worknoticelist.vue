<template>
    <div class="container-list">
      <div class="btn-container">
        <!-- 新增按钮 -->
        <router-link to="/worknotice/worknoticeAdd">
          <el-button type="success" icon="el-icon-edit">新增</el-button>
        </router-link>
      </div>
       <el-table
        v-loading="state.loading"
        :data="state.list"
        border
        fit="fit"
        stripe
        highlight-current-row
        class="table-wrapper"
        style="width: 100%"
        :row-style="{ height: '10px' }"
      >
        <el-table-column align="left" header-align="center" label="标题" prop="title" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="left" header-align="center" label="通知内容" prop="content" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="日期" prop="createDate" show-overflow-tooltip min-width="100px">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button type="primary" @click="handleView(scope)" >内容详情</el-button>
            <el-button type="primary" @click="deleteRow(scope)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="state.total > 0"
        :total="state.total"
        :page="state.listQuery.curPage"
        :limit="state.listQuery.pageSize"
        @pagination="getPageData">
      </pagination>  
    </div>
</template>

<script lang="ts">
import Pagination from '../../../src/components/Pagination.vue';
import { WorkNoticeModelData } from './model/worknoticeModel';
const {state, getDataList, deleteData } = WorkNoticeModelData();

export default {
  name: "Worknoticelist",
  components: {
    'pagination': Pagination,
  },
  data: () => {
    return {
      state,
      fit: false,
    };
  },
  watch: {
    list: () => {
      return state.list;
    },
    loading: () => {
      return state.loading;
    },
  },
  mounted: async () => {
    const data = await getDataList();
  },
  methods: {
    getPageData({page, limit}) {
      state.listQuery.curPage = page;
      state.listQuery.pageSize = limit;
      getDataList();
    },
    handleView({row}) {
      this.$router.push({
            name: "worknoticedetail",
            params: { id: row.id },
      });
    },
    deleteRow({row}) {
      deleteData(row.id);
    }
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 10px 0px;
}
.table-wrapper {
  height: calc(100vh - 220px);
  overflow: auto;
}

</style>