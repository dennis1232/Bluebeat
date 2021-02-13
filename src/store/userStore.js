import userService from '../services/userService.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export const userStore = {
    state: {
        loggedinUser : localLoggedinUser,
        isRegisteredUser: null
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },
        isRegistered(state) {
            console.log('isRegisteredUser', state.isRegisteredUser);
            return state.isRegisteredUser
        }
    },
    mutations: {
        setUser(state, {user}) {
            state.loggedinUser = user;
        },
        logUser(state, {registeredUser}) {
            console.log('isRegistered', registeredUser);
            state.isRegisteredUser = registeredUser
        },
        signUser(state, {registeredUser}) {
            console.log('isRegistered', registeredUser);
            state.isRegisteredUser = registeredUser
        }      
    },
    actions: {
        async login(context, {userCred}) {
            const user = await userService.login(userCred);
            console.log('user', user);
            context.commit({type: 'setUser', user})
            if(user) {
                this.$router.push("/")
            }
            return user;
        },
        async signup(context, {userCred}) {
            const user = await userService.signup(userCred)
            context.commit({type: 'setUser', user})
            return user;
        },
        async logout(context) {
            await userService.logout()
            context.commit({type: 'setUser', user: null})
        },
        logUser({commit}, {registeredUser}) {
            commit({type: 'logUser', registeredUser})
        },
        signUser({commit}, {registeredUser}) {
            commit({type: 'signUser', registeredUser})
        }
        
       
    }
}