export default {
  _root: null,
  _parent: null,
  _children: [],
  _show: true,
  show () {
    this._show = true;
  },
  hide () {
    this._show = false;
  },
  prevSibling () {
    if (this._parent) {
      const index = this._parent._children.indexOf(this);
      return this._parent._children[index - 1];
    }
  },
  nextSibling () {
    if (this._parent) {
      const index = this._parent._children.indexOf(this);
      return this._parent._children[index + 1];
    }
  },
  findComponent () {},
  findComponents () {}
} as any;