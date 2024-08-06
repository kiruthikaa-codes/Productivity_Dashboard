let timer;
let minutes = 25;
let seconds = 0;

document.getElementById('start-timer').addEventListener('click', () => {
  if (!timer) {
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          timer = null;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
  }
});

document.getElementById('reset-timer').addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  minutes = 25;
  seconds = 0;
  document.getElementById('minutes').textContent = '25';
  document.getElementById('seconds').textContent = '00';
});

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  loadTasks();

  addBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    if (task !== '') {
      addTodoItem(task);
      todoInput.value = '';
      saveTasks();
    }
  });

  todoList.addEventListener('click', (e) => {
    const todoItem = e.target.closest('.todo-item');
    if (todoItem) {
      if (e.target.classList.contains('checkbox')) {
     
        todoItem.classList.toggle('completed');
        saveTasks();
      } else if (e.target.classList.contains('delete-btn')) {
      
        todoList.removeChild(todoItem);
        saveTasks();
      }
    }
  });

  function addTodoItem(task, completed = false) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    if (completed) {
      checkbox.checked = true;
    }
    li.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = task;
    li.appendChild(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
      tasks.push({
        task: item.querySelector('span').textContent,
        completed: item.classList.contains('completed')
      });
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    tasks.forEach(task => {
      addTodoItem(task.task, task.completed);
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('p');

  text.classList.add('shine-animation');

  function onAnimationEnd() {
    text.classList.remove('shine-animation');
    text.classList.add('animation-complete');
  }

  text.addEventListener('animationend', onAnimationEnd, { once: true });


    // Journal Functions
    const addNoteBtn = document.getElementById('add-note-btn');
    const journalInput = document.getElementById('journal-input');
    const journalList = document.getElementById('journal-list');
    const noteModal = document.getElementById('note-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalNoteText = document.getElementById('modal-note-text');
    const modalNoteTimestamp = document.getElementById('modal-note-timestamp');

    loadNotes();

    addNoteBtn.addEventListener('click', () => {
        const noteText = journalInput.value.trim();
        if (noteText) {
            const now = new Date();
            const timestamp = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;

            const li = document.createElement('li');
            li.className = 'journal-item';
            li.innerHTML = `
                <span class="note-timestamp">Added on ${timestamp}</span>
                <button class="delete-btn">Delete</button>
                <div class="note-text">${noteText}</div>
            `;
            li.dataset.noteText = noteText; // Store the full note text in a data attribute

            journalList.appendChild(li);
            journalInput.value = ''; // Clear the input field
            saveNotes(); // Save notes to localStorage
        }
    });

    journalList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
            saveNotes(); // Save notes to localStorage after deletion
        } else if (e.target.classList.contains('journal-item')) {
            const noteItem = e.target;
            noteItem.classList.toggle('expanded'); // Toggle expanded class to show/hide note text
        }
    });

    closeBtn.addEventListener('click', () => {
        noteModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === noteModal) {
            noteModal.style.display = 'none';
        }
    });

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.journal-item').forEach(item => {
            notes.push({
                text: item.querySelector('.note-text').textContent,
                timestamp: item.querySelector('.note-timestamp').textContent
            });
        });
        localStorage.setItem('journalNotes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('journalNotes')) || [];
        notes.forEach(note => {
            const li = document.createElement('li');
            li.className = 'journal-item';
            li.innerHTML = `
                <span class="note-timestamp">${note.timestamp}</span>
                <button class="delete-btn">Delete</button>
                <div class="note-text">${note.text}</div>
            `;
            li.dataset.noteText = note.text; // Store the full note text in a data attribute

            journalList.appendChild(li);
        });
    }

});
