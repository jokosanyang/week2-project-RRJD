// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');


  var state = [{
      id: -3,
      description: 'first todo',
      done: false
    },
    {
      id: -2,
      description: 'second todo',
      done: false
    },
    {
      id: -1,
      description: 'third todo',
      done: false
    },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function (todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description
    var spanNode = document.createElement('span');
    const spanid = 'span:' + todo.id;
    spanNode.setAttribute('id', spanid);
    spanNode.textContent = todo.description;
    todoNode.appendChild(spanNode);

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
      setActive(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markTodoButtonNode = document.createElement('button');
    markTodoButtonNode.classList.add("todoButton");
    markTodoButtonNode.setAttribute('id', todo.id);
    markTodoButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
      setActive(newState);
    });
    todoNode.appendChild(markTodoButtonNode);
    // add classes for css


    return todoNode;
  };

  function setActive(todo) {
    todo.map(function (a) {
      let el = document.getElementById(a.id);
      let spanel = document.getElementById('span:' + a.id);
      if (a.done === true) {
        el.classList.add('todoButtonActive');
        spanel.style.textDecoration = "line-through";

      }
    })
  }

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      let textEntered = document.getElementsByTagName("input");
      var description = textEntered[0].value; // event.target ....
      // hint: todoFunctions.addTodo
      if (description.length > 0) {
        var newState = todoFunctions.addTodo(state, description); // ?? change this!
        update(newState);
        setActive(newState);
        document.querySelector('input').value = '';
      }
    });
  }

  // you should not need to change this function
  var update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function (state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);

  };

  if (container) renderState(state);
})();