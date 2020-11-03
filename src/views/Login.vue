<template>
    <div id="login">
        <h3 class="form__header">Введите email или пароль</h3>
        <form>
            <Input 
                class="form__input" 
                autocomplete="email" 
                clearable 
                required 
                autofocus 
                label="email" 
                placeholder="Введите email" 
                v-model="email" 
            />
            <Input 
                class="form__input" 
                clearable 
                required 
                label="password" 
                placeholder="Введите пароль" 
                v-model="password" 
                type="password" 
            />
            <Button class="form__submit el-fade-in-linear" type="submit" :disabled="disabled">
                Залогиниться
            </Button>
        </form>
        <router-link class="form__signup" to="/signup">Cоздать новый аккаунт</router-link>
    </div>
</template>

<script>
import { Input, Button } from 'element-ui';

export default {
    name: "Login",
    components: {
        Input,
        Button
    },
    updated() {
        console.log(this.$data);
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        disabled() {
            return (!this.email || !this.password); 
        }
    }   
}
</script>

<style lang="scss" scoped>
    #login {
        margin-top: 24px;
        display: grid;
        grid-gap: 24px;
        margin-top: calc(50% - 50px);
        padding: 0 16px;

        .form__header {
            font-size: 24px;
            color: currentColor;
            font-weight: bold;
        }

        .form__input {
            margin-bottom: 10px;
        }

        .form__signup {
            text-decoration: underline;
        }
    }
</style>