<template>
  <div class="tree__container" :class="{'tree__root': root}">
    <div class="tree__name" @click="fold">
      <span class="iconfont tree__icon" :class="{'icon-home': root, 
      'icon-fold': !root && localFoldStatus,
      'icon-unfold': !root && !localFoldStatus}">
      </span><span class="iconfont icon-folder tree__icon" v-show="sub"></span>
      <p class="tree__name-content">{{root ? '我的企业' : tree.name}}</p><span class="iconfont icon-select"></span>
    </div>
    <ul class="tree__list" v-show="!foldStatus">
      <li class="tree__item" v-for="(item, index) of tree.member">
        <div class="tree__content">
          <figure class="tree__item-figure" :class="{'tree__item-figure--default': !item.avatar}"><img :src="item.avatar" alt="" v-if="item.avatar"></figure>
          <p class="tree__item-content">{{item.nickname+"(" + item.real_name + ")"}}</p>
          <span class="iconfont" :class="{'icon-select': item.selected, 'icon-selected': !item.selected}" @click="select(item)"></span>
        </div>
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
        localFoldStatus: true,
        childSelectAll: false
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
        let _member = this.tree.member || []
        if (_member.length > 0) {
          return _member.find(item => !item.selected) === undefined
        }
        return true
      }
    },
    methods: {
      fold () {
        this.localFoldStatus = !this.localFoldStatus
      },
      select (item) {
        item.selected = !item.selected
      }
    },
    watch: {
      selectAll () {

      }
    }
  }
</script>