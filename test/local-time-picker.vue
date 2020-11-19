<template>
  <el-form
    class="custom-component"
    :inline="true"
    ref="form"
    :rules="rules"
    :model="form"
  >
    <!-- 时区 -->
    <el-form-item label="" prop="timezone">
      <el-select
        v-model="form.timezone"
        placeholder="请选择时区"
        style="width: 300px;"
      >
        <el-option
          v-for="item in timezones"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 时间 -->
    <el-form-item label="" prop="time">
      <el-date-picker
        style="width: 300px;"
        v-model="form.time"
        type="datetime"
        :editable="false"
        placeholder="选择日期时间"
      >
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "local-time-picker",
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 支持的所有时区
      timezones: [
        { value: -12, label: "(GMT -12:00) Eniwetok, Kwajalein" },
        { value: -11, label: "(GMT -11:00) Midway Island, Samoa" },
        { value: -10, label: "(GMT -10:00) Hawaii" },
        { value: -9, label: "(GMT -9:00) Alaska" },
        { value: -8, label: "(GMT -8:00) Pacific Time (US &amp; Canada)" },
        { value: -7, label: "(GMT -7:00) Mountain Time (US &amp; Canada)" },
        {
          value: -6,
          label: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City"
        },
        {
          value: -5,
          label: "(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima"
        },
        {
          value: -4,
          label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"
        },
        { value: -3.5, label: "(GMT -3:30) Newfoundland" },
        { value: -3, label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown" },
        { value: -2, label: "(GMT -2:00) Mid-Atlantic" },
        { value: -1, label: "(GMT -1:00 hour) Azores, Cape Verde Islands" },
        {
          value: 0,
          label: "(GMT) Western Europe Time, London, Lisbon, Casablanca"
        },
        {
          value: 1,
          label: "(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris"
        },
        { value: 2, label: "(GMT +2:00) Kaliningrad, South Africa" },
        {
          value: 3,
          label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg"
        },
        { value: 3.5, label: "(GMT +3:30) Tehran" },
        { value: 4, label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi" },
        { value: 4.5, label: "(GMT +4:30) Kabul" },
        {
          value: 5,
          label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"
        },
        {
          value: 5.5,
          label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"
        },
        { value: 5.75, label: "(GMT +5:45) Kathmandu" },
        { value: 6, label: "(GMT +6:00) Almaty, Dhaka, Colombo" },
        { value: 7, label: "(GMT +7:00) Bangkok, Hanoi, Jakarta" },
        { value: 8, label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong" },
        {
          value: 9,
          label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
        },
        { value: 9.5, label: "(GMT +9:30) Adelaide, Darwin" },
        {
          value: 10,
          label: "(GMT +10:00) Eastern Australia, Guam, Vladivostok"
        },
        {
          value: 11,
          label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia"
        },
        {
          value: 12,
          label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"
        }
      ],
      // 防止死循环
      lastTimeUpdate: new Date().getTime(),
      form: {
        timezone: +8,
        time: this.component.value ? new Date(this.component.value) : ""
      },
      rules: {
        timezone: [
          {
            type: "number",
            required: true,
            message: "请输入一个有效值",
            trigger: "change"
          }
        ],
        time: [
          {
            type: "date",
            required: true,
            message: "请输入一个有效日期",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    "form.timezone": function onTimezoneChange (newVal, oldVal) {
      this.updateTime(newVal - oldVal);
    },
    "form.time": function onTimeChange (/* newVal, oldVal */) {
      this.updateTime();
    }
  },
  methods: {
    updateTime(timezoneOffset) {
      if (!this.form.time) return;

      // 通过时间戳防止死循环
      const now = new Date().getTime();
      if (now - this.lastTimeUpdate < 1000) return;
      this.lastTimeUpdate = now;

      if (timezoneOffset === undefined) {
        // 本机时间与标准时间偏移
        const offset = -new Date(this.form.time).getTimezoneOffset() / 60;
        // 转为格林尼治标准时间
        const basicTimestamp = new Date(this.form.time).getTime() - offset * 3600 * 1000;
        // 加上所选时区偏移
        const timezoneTime = new Date(
          basicTimestamp + this.form.timezone * 3600 * 1000
        );
        // 设为所选时区对应时间
        this.form.time = new Date(timezoneTime);
      } else {
        this.form.time = new Date(
          new Date(this.form.time).getTime() + timezoneOffset * 3600 * 1000
        );
      }
      this.component.value = this.getValue();
      // console.log(this.component.value);
    },
    getValue() {
      return this.form.time ? this.formatTime(this.form.time) : undefined;
    },
    formatTime(time) {
      function padZero(t) {
        t = t.toString();
        return t.length === 1 ? `0${t}` : t;
      }
      const year = time.getFullYear();
      const month = padZero(time.getMonth() + 1);
      const day = padZero(time.getDate());
      const hour = padZero(time.getHours());
      const min = padZero(time.getMinutes());
      const sec = padZero(time.getSeconds());
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    },
    validate() {
      return new Promise((resolve, reject) => {
        try {
          this.$refs.form.validate(valid => {
            resolve(valid);
          });
        } catch (err) {
          reject(err);
        }
      });
    },
    genData() {
      return [this.getValue(), undefined];
    }
  }
};
</script>
