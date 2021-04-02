/* import {store} from '../../../store'; */
import {HttpService} from '../../../utils/HttpService';
export function WorkNoticeModelData() {

    let state = {
        loading: true, // 加载状态
        list: [], // 列表数据
        total: 0,
        listQuery: {
            curPage: 1,
            pageSize: 10,
        },
        modelData: {},
    };

    const service = new HttpService(null);

    const getDataList = () => {
        state.loading = true;
        let url = `/workNotice/${state.listQuery.curPage}/${state.listQuery.pageSize}`;
        return service.getData(url)
        .then((result:any) => {
          state.list = result.list;
          state.total = result.total;
          return result;
        })
        .catch(error => {
          console.log(error);
          service.showErrorMsg(undefined);
        })
        .finally(() => {
            state.loading = false;
        });
    }

    const saveNotice = (notice:AnalyserNode) => {
        state.loading = true;
        let url = `/workNotice`;
        return service.postData(url, notice)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                    service.showErrorMsg(undefined);
                })
                .finally(() => {
                    state.loading = false;
                });
    }

    const getDetail = (id:number) => {
        state.loading = true;
        let url = `/workNotice/${id}`;
        return service.getData(url)
                        .then((data:any) => {
                            state.modelData = data;
                        })
                        .catch(error => {
                            console.log(error);
                            service.showErrorMsg(undefined);
                        })
                        .finally(() => {
                            state.loading = false;
                        });
    }

    return { state, getDataList, saveNotice, getDetail }
}