export namespace Event {
  export interface callback {
    (params: {
      target: Component.UIComp,
      currentTarget: Component.UIComp,
      findComponent: Function
    }): void;
  };
};

export namespace Component {
  export type Comp =
    | UIComp
    | LayoutComp;

  export type UIComp =
    | Text
    | Select
    | Checkbox
    | Radio
    | Switch
    | Upload
    | Markdown
    | FormComp
    | ListComp
    | Custom;

  export type LayoutComp =
    | Row
    | Col;

  export type CompType =
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'upload'
    | 'markdown'
    | 'form'
    | 'list'
    | 'custom'
    | 'row'
    | 'col';

  interface Common {
    _vsr_vm?: Vue.Component;
    _vsr_uid?: string;
    _vsr_root?: Comp;
    _vsr_parent?: Comp;
    _vsr_children?: Comp[];
    type: CompType;
    show?: Boolean;
  };

  export interface Row extends Common {
    cols: Array<Col>;
    gutter?: number
  };

  export interface Col extends Common {
    component: UIComp | Row;
    span?: number;
  };

  export interface Base extends Common {
    label: string;
    labelTooltip?: string;
    key: string;
    value: any;
    rules?: Array<any>;
    props?: {
      [key: string]: any
    };
    tip?: string;
    onChange?: Event.callback;
    on?: {
      [key: string]: Event.callback;
    },
    slot?: {
      'component-prepend': Function;
      'component-append': Function;
    },
    i18n?: boolean;
  };

  export interface Text extends Base {
    //
  };

  interface Option {
    label: string;
    value: any;
    [propName: string]: any
  };

  interface WithOptions {
    options: (() => Option[]) | Array<Option>;
  }

  export interface Select extends Base, WithOptions {
    //
  };

  export interface Checkbox extends Base, WithOptions {
    //
  };

  export interface Radio extends Base, WithOptions {
    //
  };

  export interface Switch extends Base {
    //
  };

  export interface Upload extends Base {
    cloudinary?: {
      [key: string]: any;
    }
  };

  export interface Markdown extends Base {
    cloudinary?: {
      [key: string]: any;
    }
  };

  export interface FormComp extends Base {
    components: Array<Comp>;
  };

  export interface ListComp extends Base {
    component: Function;
    maxHeight?: string;
    min?: number;
    max?: number;
  };

  export interface Custom extends Base {
    component: Vue.Component;
  };
};

export interface Schema {
  components: Component.Comp[],
  onChange?: Event.callback;
  on?: {
    [key: string]: Event.callback;
  },
}

