const ACTION_TYPES = Object.freeze({
  ITEM_ADDED: 'ITEM_ADDED',
  ITEM_UPDATED: 'ITEM_UPDATED',
  ITEM_DELETED: 'ITEM_DELETED',
  ITEM_COMPLETED_TOGGLED: 'ITEM_COMPLETED_TOGGLED',
  ITEMS_COMPLETED_ALL: 'COMPLETED_ALL',
  COMPLETED_ITEMS_DELETED: 'COMPLETED_ITEMS_DELETED',
  FILTER_CHANGED: 'FILTER_CHANGED',
});

// payload는 값이 하나여도 객체의 프로퍼티로 내보내기로 일관성 유지
const actions = {
  addItem(text) {
    return {
      type: ACTION_TYPES.ITEM_ADDED,
      payload: { text },
    };
  },
  updateItem(index, text) {
    return {
      type: ACTION_TYPES.ITEM_UPDATED,
      payload: { index, text },
    };
  },
  deleteItem(index) {
    return {
      type: ACTION_TYPES.ITEM_DELETED,
      playload: { index },
    };
  },
  toggleItemCompleted(index) {
    return {
      type: ACTION_TYPES.ITEM_COMPLETED_TOGGLED,
      playload: { index },
    };
  },
  completedAll() {
    return {
      type: ACTION_TYPES.ITEMS_COMPLETED_ALL,
    };
  },
  clearCompleted() {
    return {
      type: ACTION_TYPES.COMPLETED_ITEMS_DELETED,
    };
  },
  filterChange(filter) {
    return {
      type: ACTION_TYPES.FILTER_CHANGED,
      payload: {
        filter,
      },
    };
  },
};

export default actions;
