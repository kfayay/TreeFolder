<template>
  <div class="tree__container" :class="{'tree__root': root}">
    <p class="tree__name" @click="fold"><span class="iconfont" :class="{'icon-home': root, 
    'icon-folder': sub, 
    'icon-fold': !root && !sub && localFoldStatus,
    'icon-unfold': !root && !sub && !localFoldStatus}"></span>{{root ? '我的企业' : tree.name}}<span class="iconfont icon-select"></span></p>
    <ul class="tree__list" v-show="!foldStatus">
      <li class="tree__item" v-for="(item, index) of tree.member">{{item.nickname}}
        <span class="iconfont" :class="{'icon-select': !item.selected, 'icon-selected': item.selected}" @click="select(item)"></span>
      </li>
      <li class="tree__item" v-if="tree.node">
        <department-tree v-for="(item, index) of tree.node" :tree="item" :parent-fold-status="foldStatus" :sub="root"></department-tree>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script>
  export default {
    name: 'DepartmentTree',
    props: {
      tree: Object,
      root: {
        default: false,
        type: Boolean
      },
      sub: {
        default: false,
        type: Boolean
      },
      parentFoldStatus: {
        default: true,
        type: Boolean
      }
    },
    data () {
      return {
        localFoldStatus: true
      }
    },
    bedoreCreate () {
      this.$options.components.DepartmentTree = require('./index.vue')
    },
    computed: {
      foldStatus () {
        let _root = this.root
        let _localFoldStatus = this.localFoldStatus
        let _parentFoldStatus = this.parentFoldStatus
        if (_root) return false
        if (_parentFoldStatus) return true
        return _localFoldStatus
      },
      selectAll () {
        return false
      }
    },
    methods: {
      fold () {
        this.localFoldStatus = !this.localFoldStatus
      },
      select (item) {
        item.selected = !item.selected
      }
    }
  }
</script>