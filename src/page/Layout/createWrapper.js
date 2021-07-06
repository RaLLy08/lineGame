export const createWrapper = (name, id) => {
    const wrapper = document.createElement('div');
    wrapper.className = name;
    if (id) wrapper.id = id;
    return wrapper;
}