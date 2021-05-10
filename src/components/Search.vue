<template>
  <div id="main">
    <div id="search">
      <lens-icon/>
      <input
        type="text"
        name=""
        placeholder="Search"
        v-model="name"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.enter="refreshConditions(filteredUsers[selected])"
        @input="searchPeople()"
      />
    </div>
    <spin-loader v-if="showLoader" />
    <div class="hints" v-if="filteredUsers.length && !showLoader">
      <div
        class="person"
        v-for="(user, idx) in filteredUsers"
        :key="user.name"
        :class="{ selected: selected == idx }"
        @click="refreshConditions(user)"
      >
        <img :src="`${user.photo}`" alt="" />
        <div class="text-info">
          <p>{{ user.name }}</p>
          <span>{{ "@" + user.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/utils/UserTypes";
import Vue from "vue";
import { searchUsers, searchPhotos } from "../utils/searching";
import SpinLoader from "./SpinLoader.vue";
import LensIcon from "./LensIcon.vue";
export default Vue.extend({
  components: {
    SpinLoader,
    LensIcon
  },
  data() {
    return {
      name: "",
      filteredUsers: {} as User[],
      showLoader: false,
      selected: -1,
      debounce: 0,
    };
  },
  methods: {
    refreshConditions(target: User = {name: "", id: 0, username: ""}) {
      this.name = target.name;
      this.filteredUsers = [];
      this.selected = -1;
    },
    up() {
      if (this.selected <= 0) {
        this.selected = this.filteredUsers.length - 1;
      } else {
        this.selected -= 1;
      }
    },
    down() {
      if (this.selected >= this.filteredUsers.length - 1) {
        this.selected = 0;
      } else {
        this.selected += 1;
      }
    },
    async searchPeople() {
      clearTimeout(this.debounce);
      this.selected = -1;
      if (this.name.trim() == "") {
        this.filteredUsers = [];
      } else {
        this.debounce = setTimeout(async () => {
          this.showLoader = true;
          let users = await searchUsers();
          for await (let user of users) {
            const photo = await searchPhotos(user);
            user.photo = photo.thumbnailUrl;
          }
          if(this.name.trim() != "") {
          this.filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(this.name.toLowerCase().trim()) ||
            user.username.toLowerCase().includes(this.name.toLowerCase().trim())
          );
          }
          this.showLoader = false;
        }, 400);

      }
    },
  },
});
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 32px;
  margin-top: 4px;
  border: 1px solid #e5e5e6;
}
#main {
  width: 343px;
  margin: auto;
  margin-top: 10%;
}
#search {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  width: 343px;
  height: 56px;
}
input {
  font-size: 16px;
  border: none;
  outline: none;
  margin-left: 20px;
  width: 287px;
  height: 22px;
}
svg {
  margin-left: 19px;
}
.person {
  width: 343px;
  height: 48px;
  margin-top: 12px;
  display: flex;
  cursor: pointer;
}
.person:hover {
  background: #f2f2f2;
}
.hints {
  width: 100%;
}
span {
  position: relative;
  height: 16px;
  font-size: 12px;
  color: #98999a;
  bottom: 7px;
}
.text-info {
  margin-left: 8px;
  margin-top: 6px;
}
.text-info p {
  font-size: 14px;
  line-height: 19px;
}
.selected {
  background: #f2f2f2;
}
</style>
