<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
import { getFavourites } from "../store/favourites/favourites.actions";

export default {
  name: "Favourites",
  data() {
    return {
      favourites: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  mounted() {
    return getFavourites(this.user.id).then(favourites => {
      this.favourites = favourites;
    });
  }
};
</script>

<style scoped></style>
