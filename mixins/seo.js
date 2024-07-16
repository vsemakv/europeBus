import { mapGetters } from 'vuex';
// import config from '@/config';

export default {
  head() {
    return {
      title: this.headTitle,
      meta: this.headMeta,

    };
  },
  computed: {
    ...mapGetters({
      pageSeo: 'seo/page',
    //   pathSeo: 'seo/path',

    }), 

    headTitle() {
        // return "test"
      return (this.pageSeo && this.pageSeo.title) || this.title;
    },
    

    headMeta() {
        return [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
     
          {
            hid: 'description',
            name: 'description',
            content:
              (this.pageSeo && this.pageSeo.description) || this.description,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Europe Bus',
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content:
              (this.pageSeo && this.pageSeo.title) ||
              this.title 
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content:
              (this.pageSeo && this.pageSeo.description) ||
              this.description ||
              '',
          },
   
        ];
      },

  },
};
