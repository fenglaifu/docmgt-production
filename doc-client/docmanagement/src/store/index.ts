import {createStore} from 'vuex'

const store = createStore({
    state: {
      counter: 0,
      isCollapse: false,
      sideBarWidth : '210px',
      sideBarWidthFolded: '14px',
      sideBarWidthExpand : '210px',
      sideBarArrow: 'el-icon-caret-left',
      sideBarArrowLeft: 'el-icon-caret-left',
      sideBarArrowRight: 'el-icon-caret-right',
      dirFileDataList: [],
      selectedFileData: {},
      dirTreeDatalist: []
    },
  });
  
export default store;