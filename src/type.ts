export interface BasicComponent {
  type: ComponentType,   // 声明配置项组件类型
  label: string;         // 配置项标题
  labelTootip?: string;  // 配置项标题提示
  key: string;           // 对应 schemaData 的 key
  value: any;            // 配置项初始值，对应 schemaData 的 value
  props?: any;           // 传递给配置项组件的 props
  hidden?: boolean;      // 是否隐藏
  tip?: string;          // 提示信息
  disabled?: boolean | (() => boolean);
  rules?: Array<Rule>;   // 符合 async-validator 的校验规则
  onChange?: (args: {
    component: Component
  }) => void;
  on?: {
    [event: string]: (args: { component: Component }) => void;
  }
}

type ComponentType =
  'text'
  | 'textarea'
  | 'select'
  | 'switch'
  | 'checkbox'
  | 'radio'
  | 'upload'
  | 'markdown'
  | 'array'
  | 'object'
  | 'custom';

// rule of async-validator
// 完整见: https://github.com/yiminghe/async-validator#rules
interface Rule {
  type: string;
  required: boolean;
  message: string;
  trigger: string;
  pattern: any;
  validator: any;
};

type Options = Array<string> | Array<{ label: string; value: string; }>;

export interface Text extends BasicComponent {};

export interface Textarea extends Text {};

export interface Switch extends BasicComponent {};

export interface Select extends BasicComponent {
  options: Options | (() => Options)
};

export interface Checkbox extends BasicComponent {
  options: Options | (() => Options)
};

export interface Radio extends BasicComponent {
  options: Options | (() => Options)
};

export interface List extends BasicComponent {
  component: Component;                   // 指定列表项组件
  creatable?: boolean | (() => boolean);  // 是否可新增列表项
  removable?: boolean | (() => boolean);  // 是否可移除列表项
  movable?: boolean | (() => boolean);    // 是否可移动列表项
  collapsable?: boolean;                  // 是否可展开收起
  collapsed?: boolean;                    // 默认是否收起
};

export interface Form extends BasicComponent {
  labelPosition: 'left' | 'right' | 'top';
  labelWidth: string;
  components: Array<Component>;
};

// cloudinaryOptions 见：https://cloudinary.com/documentation/upload_widget_reference#parameters
export interface Upload extends BasicComponent {
  resourceType: 'image' | 'video',
  cloudinaryOptions: any;
  showResourceUrl: boolean;
};

export interface Markdown extends BasicComponent {
  cloudinaryOptions: any;
};

type Component =
  | Text
  | Textarea
  | Select
  | Checkbox
  | Radio
  | Switch
  | List
  | Form
  | Upload
  | Markdown;

export interface Schema extends Form {};
