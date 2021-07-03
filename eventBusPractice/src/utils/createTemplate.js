const createTempltae = DOMstring => {
  const template = document.createElement('template');
  template.innerHTML = DOMstring;
  return template.content.firstElementChild.cloneNode(true);
};

export default createTempltae;
