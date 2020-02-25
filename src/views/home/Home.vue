

<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
    />
    <goods-list :goods="showGoods"/>
    <ul>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
      <li>p</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from './childComps/FeatureView'

  import {getHomeGoods, getHomeMulitidata} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    created () {


      // 1 请求多个数据
      this.getHomeMulitidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods:{


      /********
       * 事件监听的相关方法
       * */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
      },
      /**
       * 网络请求的相关方法
       */
      getHomeMulitidata (){
        getHomeMulitidata().then(res => {
          // console.log(res);
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
          // let {banner:{list:banners},recommend:{list:recommends}}=res.data
          // console.log(banners);
          // console.log(recommends);
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page +1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
        })
      }

      },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    padding-bottom: 49px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
