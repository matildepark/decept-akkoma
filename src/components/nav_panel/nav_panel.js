import TimelineMenuContent from '../timeline_menu/timeline_menu_content.vue'
import { mapState, mapGetters } from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faChevronDown,
  faChevronUp,
  faComments,
  faBolt,
  faInfoCircle,
  faStream,
  faList,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faChevronDown,
  faChevronUp,
  faComments,
  faBolt,
  faInfoCircle,
  faStream,
  faList,
  faBullhorn
)

const NavPanel = {
  components: {
    TimelineMenuContent
  },
  data () {
    return {
      showTimelines: false
    }
  },
  methods: {
    toggleTimelines () {
      this.showTimelines = !this.showTimelines
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      privateMode: state => state.instance.private,
      federating: state => state.instance.federating
    }),
    ...mapGetters(['unreadAnnouncementCount']),
    followRequestCount () {
      return this.$store.state.users.currentUser.follow_requests_count
    }
  }
}

export default NavPanel
