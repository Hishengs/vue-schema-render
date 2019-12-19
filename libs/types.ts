export namespace Event {
  export interface onChange {
    (params: {
      component: Component.Comp
    }): void;
  };
};

export namespace Component {
  export type Comp =
    | Text
    | Select
    | Checkbox
    | Radio
    | FormComp
    | ListComp
    | Custom
    | Row
    | Col;

  export type UIComp =
    | Text
    | Select
    | Checkbox
    | Radio
    | FormComp
    | ListComp
    | Custom;

  export type LayoutComp = 
    | Row
    | Col;

  export type CompType =
    | 'text'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'slider'
    | 'form'
    | 'list'
    | 'upload'
    | 'markdown'
    | 'custom'
    | 'row'
    | 'col';

  interface Common {
    _vm?: Vue;
    _uid?: string;
    _parent?: Comp;
    _children?: Comp[];
    type: CompType | string;
    visible?: Boolean;
    dragable?: Boolean;
  };

  export interface Row extends Common {
    cols: Array<Col>;
    gutter?: number
  };

  export interface Col extends Common {
    component: Component.Base;
    span?: number;
  };

  export interface Base extends Common {
    label: string;
    labelTooltip?: string;
    key: string;
    value?: any;
    _refValue?: any;
    rules?: Array<any>;
    props?: any;
    tip?: string;
    onChange?: Event.onChange;
    on?: {
      [key: string]: Function;
    },
    slot?: {
      [key: string]: Function;
    },
  };

  export interface MultiLanComp extends Base {
    multiLanguage?: boolean;
  };

  export interface TextCommon extends MultiLanComp {
    placeholder?: string;
  };

  export interface Text extends TextCommon {
    placeholder?: string;
  };

  export interface Option {
    label: string;
    value: any;
    [propName: string]: any
  };

  export interface Select extends Base {
    options: Function | Array<Option>;
  };

  export interface Checkbox extends Base {
    options: Function | Array<Option>;
  };

  export interface Radio extends Base {
    options: Function | Array<Option>;
  };

  export interface FormComp extends Base {
    components: Array<Comp>;
  };

  export interface ListComp extends Base {
    component: Function;
    maxHeight?: string;
  };

  export interface Custom extends Base {
    component: any;
  };
};

export type LayoutComp = Component.Row | Component.Col;

export interface Schema {
  title?: string;
  components: Array<Component.Comp>;
  value?: any;
  _refValue?: any;
  onChange?: Event.onChange;
};

export interface RenderOptions {
  locale?: string;
  pages: {
    list: {
      filter: {
        schema?: Schema;
        immediateFilter: boolean;
      };
      columns?: Array<any> | Function;
      beforeRender?: Function;
    };
    create: {
      schema?: Schema;
      beforeRender?: Function;
    };
    edit: {
      beforeRender?: Function;
    };
  };
};

export enum ConfigLanStatus {
  UNADD = -1,
  DRAFT = 0,
  PUBLISH = 1,
  UNPUBLISH = 2,
};

export interface Config {
  id: number;
  module: string;   // topic
  platform: string;
  title: string;
  creator: string;  // create_user
  createAt: Date;   // create_time
  modifier: string;   // edit_user
  modifyAt: Date;   // last_modify_time
  urlKey: string;   // url_key
  link: string;
  publishedLanguages?: string;
  selectedLanStatus: ConfigLanStatus; // select_language_status
};
