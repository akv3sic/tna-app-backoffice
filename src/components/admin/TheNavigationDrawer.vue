<template>
    <div>
        <v-navigation-drawer 
            color="light-blue lighten-5"
            v-model="drawer"
            app
        >
        <v-list-item>
            <v-list-item-content>
                <v-row>
                    <v-col justify-center>
                    <router-link to="/" class="text-decoration-none  text-uppercase primary--text">
                        <span class="d-inline font-weight-bold">Sustav za evidenciju prisutnosti</span>
                    </router-link>
                    </v-col>
                </v-row>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

            <v-list
                nav
                dense
            >
                 <v-list-item
                 v-for="item in navigationItems"
                 :key="item.title"
                 :to="item.to"
                 >
                    <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>

            </v-list>
            <!-- ide na dno -->
            <template v-slot:append>
              <div class="pa-2">
                <v-list-item
                    to="admin/podrska"
                    exact
                    >
                    <v-list-item-title>Podrška</v-list-item-title>
                </v-list-item>
              </div>
          </template>

        </v-navigation-drawer>
    </div>
</template>

<script>

export default {
    name: 'NavigationDrawer',
    data: () => ({
      navigationItems: [
      {
          icon: 'mdi-calendar',
          title: 'Aktivni događaji',
          to: '/admin/aktivni-dogadjaji'
        },
        {
          icon: 'mdi-calendar-clock',
          title: 'Završeni događaji',
          to: '/admin/zavrseni-dogadjaji'
        },
        {
          icon: 'mdi-shape',
          title: 'Kategorije događaja',
          to: '/admin/kategorije-dogadjaja'
        },
        {
          icon: 'mdi-account-group',
          title: 'Pregled po osobama',
          to: '/admin/osobe'
        },
        {
          icon: 'mdi-cog',
          title: 'Postavke',
        }
      ]
    }),
    computed: {
      drawer: {
        get () {
          return this.$store.getters['admin/drawer']
        },
        set (val) {
          this.$store.dispatch('admin/setDrawer', val)
        },
      },
    },
}
</script>