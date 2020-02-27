<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control1"
      v-show="isTabFixed"
    />
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pulling="loadMore"
            @scroll="contentScroll">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"
      />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from './childComps/FeatureView'

  import {getHomeGoods, getHomeMulitidata} from "network/home";
  import {debounce} from "common/utils";

  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop.vue'
  // import BackTop from '/BackTop'
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0
      }
    },
    created() {
      // 1 请求多个数据
      this.getHomeMulitidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        // console.log('------')
        // this.$refs.scroll.refresh()
        refresh()
      })
      // setTimeout(()=>{
      //   console.log(this.$refs.tabControl.$el.offsetTop);
      // },300)
    },
    methods: {


      /********
       * 事件监听的相关方法
       * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      backClick() {

        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        // console.log(position);
        // if((-position.y)>800){
        //   this.isShowBackTop=true
        // }else {
        //   this.isShowBackTop=false
        // }
        this.isShowBackTop = (-position.y) > 800
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        // console.log('shangla')
        this.getHomeGoods(this.currentType)

      },
      swiperImageLoad() {

        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求的相关方法
       */
      getHomeMulitidata() {
        getHomeMulitidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          // let {banner:{list:banners},recommend:{list:recommends}}=res.data
          // console.log(banners);
          // console.log(recommends);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }

    },
    activated(){

      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){

      this.saveY= this.$refs.scroll.getScrollY()
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*padding-bottom: 49px;*/
    height: 100vh;
    /*position: relative;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 19;
  }

  .tab-control1 {
    /*position: sticky;*/
    /*top: 44px;*/
    margin-top: 44px;
    z-index: 9;
    position: relative;

  }

  .content {
    /*height: calc(100% - 47px);*/
    /*overflow: hidden;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
</style>
