import { reactive, onMounted, ref } from "vue";
import request from "../../../../src/utils/request";
import { WorkNotice } from './WorkNoticeInterface';

export function WorkNoticeModelData() {

    const state = reactive({
        loading: true, // 加载状态
        list: [], // 列表数据
        total: 0,
        listQuery: {
            curPage: 1,
            pageSize: 10,
        },
        modelData: {

        }
    });

    const getDataList = () => {
        state.loading = true;
        let url = `/workNotice/${state.listQuery.curPage}/${state.listQuery.pageSize}`;
        return request({
                url: url,
                method: "get"
            })
            .then(response => {
                console.log(response);
                state.list = response.data.list;
                state.total = response.data.total;
            })
            .finally(() => {
                state.loading = false;
            });
    }
    getDataList();

    const getDetail = (id: number) => {
        state.loading = true;
        let url = `/workNotice/${id}`;
        return request({
                url: url,
                method: "get"
            })
            .then(response => {
                console.log(response);
                modelData = ref(Object.assign({},response.data));
                state.modelData = Object.assign({},response.data);
            })
            .finally(() => {
                state.loading = false;
            });
    }

    const deleteNotice = (id: number) => {
        state.loading = true;
        let url = `/workNotice/${id}`;
        return request({
                url: url,
                method: "DELETE"
            })
            .then(response => {
                console.log(response);
            })
            .finally(() => {
                state.loading = false;
            });
    }

    const saveNotice = (notice: any) => {
        state.loading = true;
        let url = `/workNotice`;
        return request({
                url: url,
                method: "POST",
                data: notice.value
            })
            .then(response => {
                console.log(response);
            })
            .finally(() => {
                state.loading = false;
            });
    }

    let modelData = ref(Object.assign({}, {
        id: undefined,
        title : undefined,
        content : undefined,
        createDate : undefined
    }));

    return {state, getDataList, getDetail, deleteNotice, saveNotice, modelData}
}