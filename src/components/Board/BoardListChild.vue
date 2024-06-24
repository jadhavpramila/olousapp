<template>
  <div class="form-container">
    <div class="md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] pb-[2rem] h-full w-full">
      <!-- TABS -->
      <div class="flex w-full" v-if="!isShowSkeleton">
        <div class="card w-full">
          <TabView ref="tabview" @tab-click="setIndex">
            <TabPanel :header="tabs.PUBLIC">
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <template v-for="(data, index) in publicBoard" :key="index">
                  <Board :boardData="data" />
                </template>
              </div>
            </TabPanel>
            <TabPanel :header="tabs.MYBOARD">
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <template
                  v-for="(data, index) in boardData.boards"
                  :key="index"
                >
                  <Board :boardData="data" />
                </template>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div v-if="isShowSkeleton" class="lg:col-span-8 col-span-12 mb-1">
        <BoardListSkeleton></BoardListSkeleton>
      </div>
    </div>
  </div>
  <div class="board-overlay" :style="{ display: display }">
    <div class="flex p-5">
      <div class="">
        <button class="m-4" type="submit" @click="closeBoard()">
          <img src="../../assets/close.svg" alt="" />
        </button>
      </div>
      <div class="flex w-full">
        <CreateBoard />
      </div>
    </div>
  </div>
</template>
<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import CreateBoard from "/src/components/Board/CreateBoard.vue";
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  watchEffect,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import Board from "./Board.vue";
import BoardListSkeleton from "./BoardListSkeleton.vue";
import appConstants from "../../appConstants.js";

export default {
  name: "BoardListChild",
  components: {
    TabView,
    TabPanel,
    CreateBoard,
    Board,
    BoardListSkeleton,
  },

  async setup() {
    let display = ref("none");
    const store = useStore();
    let isShowSkeleton = ref(true);
    let position = ref(0);
    const tabs = {
      PUBLIC: "Public Boards",
      MYBOARD: "My Boards",
    };
    let args = reactive({
      page: 1,
      offset: 0,
      limit: 10,
    });

    let isNextCall = ref(true);
    let myBoardArgs = reactive({
      page: 1,
      offset: 0,
      limit: 10,
    });

    let active = computed(() => store.getters["board/getter_activeTab"]);

    document.onscroll = function () {
      let pos = getVerticalScrollPercentage(document.body);
      position.value = Math.round(pos);
      //console.log("position =>", pos);
    };

    function getVerticalScrollPercentage(elm) {
      var p = elm.parentNode;
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      );
    }
    isShowSkeleton.value = true;
    let isFetchingNewData = ref(false);
    let boardData = computed(() => store.getters["board/getter_boardData"]);
    let publicBoard = computed(
      () => store.getters["board/getter_publicBoardData"]
    );
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData.value) {
          isFetchingNewData.value = true;
          if (active.value == 0) {
            loadPublicBoard();
          } else {
            loadMyBoard();
          }
        }
      }
    });

    onBeforeMount(() => {
      // debugger;
      // console.log(publicBoard.value);
      if ((Object.keys(publicBoard.value).length === 0) == true) {
        // loadData();
        //  console.log("index....", active.value);
        if (active.value == 0) {
          loadPublicBoard();
        } else {
          loadMyBoard();
        }
      } else {
        isShowSkeleton.value = false;
      }
    });
    // await loadData();

    function clickCreateBoard() {
      display.value = "block";
    }

    function closeBoard() {
      display.value = "none";
    }

    async function loadPublicBoard() {
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;
      // active.value = computed(
      //   () => store.getters["board/getter_activeTab"]
      // ).value;
      try {
        await store
          .dispatch("board/action_getPublicBoardData", args)
          .then((res) => {
            if (res) {
              isShowSkeleton.value = false;
              isFetchingNewData.value = false;
              args.page = res.currentPage + 1;
              if (res.next == null) {
                isNextCall.value = false;
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
    }

    async function loadMyBoard() {
      if (!isNextCall.value) {
        return;
      }
      myBoardArgs.offset = (myBoardArgs.page - 1) * myBoardArgs.limit;
      // active.value = computed(
      //   () => store.getters["board/getter_activeTab"]
      // ).value;
      try {
        await store
          .dispatch("board/action_getBoardData", myBoardArgs)
          .then((res) => {
            if (res) {
              isShowSkeleton.value = false;
              isFetchingNewData.value = false;
              // myBoardArgs.page = res.currentPage + 1;
              if (res.next == null) {
                isNextCall.value = false;
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
    }

    function setImageUrl(name) {
      return `${import.meta.env.VITE_APP_MEDIA_IMGURL}${name}`;
    }

    function shortForm(fName, lName) {
      let initialLetters =
        fName.charAt(0).toUpperCase() + lName.charAt(0).toUpperCase();
      return initialLetters;
    }

    function setIndex(tabinfo) {
      ///console.log("index", tabinfo);
      if (tabinfo.index == 0) {
        loadPublicBoard();
      } else if (tabinfo.index == 1) {
        loadMyBoard();
      }
      store.commit("board/commit_activeTab", tabinfo.index);
      let element = document.querySelector(".p-tabview .p-tabview-nav li");
      if (window.innerWidth < appConstants.css_breakpoints.MD) {
        if (tabinfo.index == 0) {
          element.style.width = "130px";
        } else if (tabinfo.index == 1) {
          element.style.width = "120px";
          loadMyBoard();
        }
      } else {
        element.style.width = "175px";
        // if (index == 0) {
        //   element.style.width = "190px";
        // } else if (index == 1) {
        //   element.style.width = "190px";
        // }
      }
    }
    // function myboardTabClick(tabinfo) {
    //   if (tabinfo.originalEvent.target.innerText == tabs.MYBOARD) {
    //     loadMyBoard();
    //   }
    // }

    return {
      args,
      isNextCall,
      myBoardArgs,
      display,
      boardData,
      publicBoard,
      active,
      isFetchingNewData,
      isShowSkeleton,
      tabs,
      clickCreateBoard,
      closeBoard,
      loadPublicBoard,
      loadMyBoard,
      setImageUrl,
      shortForm,
      setIndex,
      //myboardTabClick,
    };
  },
};
</script>
<style scoped>
.board-overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(112, 112, 112, 0.5);
  z-index: 2;
  cursor: pointer;
}
</style>
