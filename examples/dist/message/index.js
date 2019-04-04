const config = {
  content: '',
  icon: '',
  image: '',
  type: 'primary',
  duration: 1500,
  success: null
}

Component({
  externalClasses: ['l-class', 'l-image-class'],
  properties: {
    show: Boolean,
    icon: String,
    image: String,
    content: String,
    type: {
      type: String,
      value: 'primary'
    },
    duration: {
      type: Number,
      value: 1500
    },
    openApi: {
      type: Boolean,
      value: true
    }
  },

  data: {
    status: false,
    ...config
  },

  observers: {
    'show': function(show) {
      show && this.changeStatus()
    }
  },


  lifetimes: {
    show() {
      this.data.openApi && this.initMessage();
    },

    attached() {
      this.data.openApi && this.initMessage();
    }
  },

  methods: {
    initMessage() {
      wx.lin = wx.lin || {};
      wx.lin.showMessage = (options) => {
        const {
          content = config.content,
            icon = config.icon,
            image = config.image,
            type = config.type,
            duration = config.duration,
            success = config.success
        } = options;
        this.data.success = success
        this.setData({
          content,
          icon,
          image,
          duration,
          type
        });
        this.changeStatus()
        return this;
      };
    },

    changeStatus() {
      this.setData({
        status: true
      })
      if (this.data.timer) clearTimeout(this.data.timer)
      this.data.timer = setTimeout(() => {
        this.setData({
          status: false
        })
        this.data.show = false
        this.data.timer = null
        if (this.data.success) this.data.success()
      }, this.properties.duration)
    }
  }
})