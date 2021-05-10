import Vue from 'vue';
import { shallowMount, Wrapper } from "@vue/test-utils";
import Search from "@/components/Search.vue";
import SpinLoader from "@/components/SpinLoader.vue";
import LensIcon from "@/components/LensIcon.vue";
let wrapper: any;
describe("Search.vue", () => {
  beforeEach(() => {
   wrapper = shallowMount(Search);
  });
  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });
  test("calls searchPeople when input event triggers", () => {
    const spy = jest.spyOn(wrapper.vm, 'searchPeople');
    wrapper.find('input').trigger('input');
    expect(spy).toHaveBeenCalled();
  });
  test("'selected' option is -1 by default", () => {
    expect(wrapper.vm.selected).toBe(-1);
  });
  test("'name' option is empty string by default", () => {
    expect(wrapper.vm.name).toBe("");
  });
  test("'showLoader' option is false by default", () => {
    expect(wrapper.vm.showLoader).toBe(false);
  });
  test("'debounce' option is 0 by default", () => {
    expect(wrapper.vm.showLoader).toBe(false);
  });
  test("'filteredUsers' option is {} by default", () => {
    expect(wrapper.vm.filteredUsers).toEqual({});
  });
  test("Up arrow key triggers up method", () => {
    const spy = jest.spyOn(wrapper.vm, 'up');
    wrapper.find('input').trigger('keydown.up');
    expect(spy).toHaveBeenCalled();
  });
  test("Down arrow key triggers down method", () => {
    const spy = jest.spyOn(wrapper.vm, 'down');
    wrapper.find('input').trigger('keydown.down');
    expect(spy).toHaveBeenCalled();
  });
  test("Up method decrements 'selected' option by 1", () => {
    wrapper.vm.selected = 1;
    wrapper.vm.up()
    expect(wrapper.vm.selected).toBe(0);
  });
  test("Down method increments 'selected' option by 1", () => {
    wrapper.vm.down()
    expect(wrapper.vm.selected).toBe(0);
  });
  test("Up method sets 'selected' option in filteredUsers.length-1, if it's equal or lesser than 0", () => {
    wrapper.vm.filteredUsers = [1, 2, 3]
    wrapper.vm.selected = 0;
    wrapper.vm.up()
    expect(wrapper.vm.selected).toBe(wrapper.vm.filteredUsers.length-1);
  });
  test("Down method sets 'selected' option in 0, if it's equal or greater than filteredUsers.length-1", () => {
    wrapper.vm.filteredUsers = [1, 2, 3];
    wrapper.vm.selected = wrapper.vm.filteredUsers.length-1;
    wrapper.vm.down();
    expect(wrapper.vm.selected).toBe(0);
  });
  test("Enter triggers refreshConditions", () => {
    const spy = jest.spyOn(wrapper.vm, 'refreshConditions');
    wrapper.find('input').trigger('keydown.enter');
    expect(spy).toHaveBeenCalled();
  });
  test("Click triggers refreshConditions", async () => {
    wrapper.vm.filteredUsers = [{name: "Joe", id: 0, username: "Joe"}]
    const spy = jest.spyOn(wrapper.vm, 'refreshConditions');
    await Vue.nextTick();
    wrapper.find('.person').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  test("refreshConditions sets correct values", () => {
    wrapper.vm.filteredUsers = [1, 2, 3];
    wrapper.vm.selected = 1;
    wrapper.vm.name = "Joe";
    wrapper.vm.refreshConditions();
    expect(wrapper.vm.selected).toBe(-1);
    expect(wrapper.vm.filteredUsers).toEqual([]);
    expect(wrapper.vm.name).toBe("");
    wrapper.vm.refreshConditions({name: "Alex", id: 0, username: "Alex"});
    expect(wrapper.vm.name).toBe("Alex");
  });
  test("shows SpinLoader if showLoader is true", () => {
    wrapper.vm.showLoader = true;
    expect(shallowMount(SpinLoader)).toBeTruthy()
  });
  test("shows LensIcon on the", () => {
    expect(shallowMount(LensIcon)).toBeTruthy()
  })
});
