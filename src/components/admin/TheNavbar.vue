<template>
    <div>
        <v-app-bar
            color="blue darken-2"
            dark
            app
            flat
        >
            <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
            <v-toolbar-title>Administracija sustava</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>

            <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">    
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-avatar color="green" size="40">
                            <span class="text-h6">{{ avatarText }}</span>
                        </v-avatar>
                    </v-btn>
                </template>
                    <v-list
                        dense
                    >
                    <v-list-item
                    v-for="(item, index) in accountMenuItems"
                    :key="index"
                    @click="handleAccountMenuItemClick(item.action)"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
          
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: 'Navbar',
    data: () => ({
       accountMenuItems: [
            { title: 'Odjava', action: 'logOut'},  
            ],
    }),
    mounted() {
        this.$store.dispatch('auth/fetchUser', { root: true })
    },
    computed: {
      ...mapState('admin', ['drawer']),
      ...mapGetters('auth', ['user', 'avatarText']),
    },
     methods: {
         handleAccountMenuItemClick(action) {
             switch(action) {
             case 'logOut':
                this.$store
                    .dispatch('auth/logOut', { root: true })
                 this.$router.push({path: '/'})
                break;
                }
             },
     ...mapActions('admin', ['setDrawer'])
    },
}
</script>