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
                <v-card>
                    <div class="center pt-3">
                        <v-badge
                            :icon="userBadgeIcon"
                            overlap
                            bordered
                            avatar
                        >
                            <v-avatar color="green" size="40">
                                <span class="text-h6">{{ avatarText }}</span>
                            </v-avatar>
                        </v-badge>
                    </div>
                    <v-card-title class="text-h5 mt-0">{{ user.first_name }} {{ user.last_name }}</v-card-title>
                    <v-card-subtitle class="text-caption">{{ user.email }}</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-btn
                        v-for="(item, index) in accountMenuItems"
                        :key="index"
                        @click="handleAccountMenuItemClick(item.action)"
                        text
                        depressed
                        block
                    >
                        {{ item.title }}
                    </v-btn>
                </v-card>
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
        userBadgeIcon() {
            if (this.user.is_superuser) {
                return 'mdi-security'
            } else if (this.user.is_staff) {
                return 'mdi-account-star'
            }
            else {
                return 'mdi-account'
            }
        },
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

<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>