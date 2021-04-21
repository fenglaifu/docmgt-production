
import {HttpService} from '../../../utils/HttpService';
import axios from 'axios';
import { Message } from 'element-ui';

export function DocModelData() {

    const service = new HttpService(null);

    const baseURL = service.baseURL;

    const state = {
        loading: true, // 加载状态
        dataList: [], // 列表数据
        total: 0,
        listQuery: {
            curPage: 1,
            pageSize: 10,
        },
        dirFilePath: '',
        defaultProps: {
            label: "fileName",
            children: "children",
            isLeaf: 'leaf'
        }
    };

    const getAllDataList = (vueObj:any) => {
        state.loading = true;
        let url = '/docFile/getAllDirFile';
        return service.getData(url)
        .then((result:any) => {
            state.dataList = result;
            vueObj.$store.state.dirFileDataList = result;
            vueObj.$store.commit('setDirFileDataList', result);
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

    const getAllDirTree = () => {
        let url = '/docFile/getAllDirTree';
        return service.getData(url)
        .then(result => {
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

    const getFileInfo =(id: number) => {
        let url = `/docFile/${id}`;
        return service.getData(url)
        .then(result => {
            return result;
        })
        .finally(() => {
            state.loading = false;
        });
    }

    const deleteFile =(id: number) => {
        let url = `/docFile/${id}`;
        state.loading = true;
        return service.deleteData(url)
        .then(result => {
            return result;
        })
        .finally(() => {
            state.loading = false;
        });
    }

    const services = axios.create({
        baseURL: baseURL,
        timeout: 360000
      });
      
      services.interceptors.request.use(
        (config) => {
          return config;
        },
        (error) => {
          console.log(error);
          service.showErrorMsg(undefined);
          return Promise.reject(error);
        }
      );
      
      services.interceptors.response.use(
        (response) => {
          response.headers['Content-Type'] = 'application/json';
          response.headers['Access-Control-Allow-Origin'] = '*';
          return response;
        },
        (error) => {
          console.log("err" + error);
          Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
          });
          return Promise.reject(error);
        }
      );

    const previewFile = (id: number) => {
        let url = `/preview/${id}`;
        return services({
            url: url,
            method: "get",
            responseType:'arraybuffer'
        });
    }

    const previewDocxFile = (id: number) => {
        let url = `/preview/${id}`;
        return axios({
            url: baseURL + url,
            responseType:'arraybuffer',
        }).then(result => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
            service.showErrorMsg(undefined);
        });
    }

    const previewXlsxFile = (id: number) => {
        let url = `/preview/${id}`;
        return services({
            url: url,
            method: "get",
            responseType:'arraybuffer'
        });
    }

    const previewPdfFile = (id: number) => {
        let url = `/preview/${id}`;
        return axios({
            url: baseURL + url,
            responseType:'arraybuffer',
        }).then(result => {
            return result.data;
        })
        .catch(error => {
            console.log(error);
            service.showErrorMsg(undefined);
        });
    }
    
    const uploadSingle = (filePath:any) => {
        let url = '/uploadSingle';
        return service.postData(url,filePath,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            service.showErrorMsg(undefined);
        });
    }

    const downloadFile = (id: number) => {
        /* return request({
            url: "/downloadFile",
            method: "get",
            params: {'filePath': filePath}
        })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log('download');
            console.log(error);
        }); */
        window.location.href = baseURL + "/download/" + id;

    }

    
    return {state, baseURL, getAllDataList, getAllDirTree, getFileInfo, deleteFile, previewFile, previewPdfFile, previewXlsxFile, previewDocxFile, uploadSingle, downloadFile}
}