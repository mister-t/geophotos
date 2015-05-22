define(function(){
  return {

    home: {
      SHOW_HOME: 'home:show'
    },

    sidebar: {
      SHOW_SIDEBAR: 'sidebar:show'
    },

    auth: {
      LOGOUT: 'auth:logout'
    },

    courses: {
      show: {
        HOME: 'courses:show:home',
        COURSE: 'courses:show:course'
      },
      list: {
        COURSES: 'courses:list:classes'
      }
    },

    students: {
      show: {
        HOME: 'students:show:home',
        PROFILE: 'students:show:profile'
      },
      select: {
        ON: 'students:select:on',
        OFF: 'students:select:off'
      },
      list: {
        PROFILES: 'students:list:profiles'
      }
    }
  };
});
