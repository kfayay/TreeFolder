<template>
  <div class="tree__container" :class="{'tree__root': root}">
    <div class="tree__name" @click="fold">
      <span class="iconfont tree__icon" :class="{'icon-home': root, 
      'icon-fold': !root && sub && localFoldStatus,
      'icon-unfold': !root && sub && !localFoldStatus,
      'icon-sub-fold': !root && !sub && localFoldStatus,
      'icon-sub-unfold': !root && !sub && !localFoldStatus}">
      </span><span class="iconfont icon-folder tree__icon" v-show="sub"></span>
      <p class="tree__name-content">{{root ? '我的企业' : tree.name}}</p><span class="iconfont" :class="{'icon-select': !allSelected, 'icon-selected': allSelected}" @click.stop="selectAll"></span>
    </div>
    <ul class="tree__list" v-show="!foldStatus">
      <li class="tree__item" v-for="(item, index) of member">
        <div class="tree__content">
          <figure class="tree__item-figure" :class="{'tree__item-figure--default': !item.avatar}"><img :src="item.avatar" alt="" v-if="item.avatar"></figure>
          <p class="tree__item-content">{{item.nickname+"(" + item.real_name + ")"}}</p>
          <span class="iconfont" :class="{'icon-select': !item.selected, 'icon-selected': item.selected}" @click="select(item)"></span>
        </div>
      </li>
      <li class="tree__item" v-if="tree.node">
        <department-tree v-for="(item, index) of tree.node" :tree="item" 
        :parent-fold-status="foldStatus" 
        :sub="root" @toggle="toggle" 
        :selected="selected"
        :key="item.id"></department-tree>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script>
  import {TreeFind, TreeFlat} from '@/utils/tree'
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
      },
      selected: {
        default: function () {
          return []
        },
        type: Array
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
      member () {
        let _member = this.tree.member || []
        let _selected = this.selected
        return _member.map((item) => {
          if (~_selected.indexOf(item.user_id)) {
            return Object.assign({}, item, {selected: true})
          } else {
            return Object.assign({}, item, {selected: false})
          }
        })
      },
      allSelected () {
        let _tree = this.tree
        let _selected = this.selected
        let _unselected = TreeFind(_tree, (item) => {
          return _selected.indexOf(item.user_id) === -1
        })
        let _hasMember = TreeFind(_tree, (item) => item !== undefined)
        if (_unselected === undefined && _hasMember !== undefined) return true
        return false
      }
    },
    methods: {
      fold () {
        this.localFoldStatus = !this.localFoldStatus
      },
      select (item) {
        let _list = [item.user_id]
        let _type = item.selected ? 'remove' : 'add'
        this.$emit('toggle', _list, _type)
      },
      toggle (list, type) {
        this.$emit('toggle', list, type)
      },
      selectAll () {
        let _tree = this.tree
        let _allSelected = this.allSelected
        let _all = TreeFlat(_tree, item => item.user_id)
        let _type = _allSelected ? 'remove' : 'add'
        this.$emit('toggle', _all, _type)
      }
    }
  }
</script>