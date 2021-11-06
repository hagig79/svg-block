class ViewManager {
  views = new Map();

  set(model, view) {
    this.views.set(model, view);
  }

  get(model) {
    return this.views.get(model);
  }
}

export { ViewManager };
