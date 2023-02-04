
const tasks = document.querySelectorAll(".task");
const all_status = document.querySelectorAll(".status");
let append_task = document.querySelector("#open");
let draggableTask = null;

tasks.forEach((task) =>{
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
});

function del_task (e) {
    e.target.parentElement.parentElement.style.display = "none";
}

let isDraggable;

function dragStart(e) {
    isDraggable = e.target.parentElement.classList[1];
    draggableTask = this;
}

function dragEnd() {
    draggableTask = null;
    setTimeout(() => {
        this.style.display = "block";
    },0);
}

all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
}


function dragEnter() {
    this.style.border = "1px dashed #ccc";
}

function dragLeave() {
    this.style.border = "none";
}

function dragDrop(e) {
    if(isDraggable === e.target.id) {
        this.style.border = "none";
        this.appendChild(draggableTask);
    } else {
        alert('the drag should be in sequence');
    }
}

// modal
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});

close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (event) => {
    if(event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
};


// create task
const task_submit = document.getElementById("task-submit");


function createTask() {
    
    const input_name = document.getElementById("task-name").value;
    const input_desc = document.getElementById("task-description").value;

    const task_div = document.createElement("div");
    task_div.classList.add("task");
    task_div.draggable = "true";
    task_div.addEventListener("dragstart", dragStart);
    task_div.addEventListener("dragend", dragEnd);

    const header_div = document.createElement("div");
    header_div.setAttribute("id","task-heading-task");
    header_div.innerHTML = input_name;

    const close_span = document.createElement("span");
    close_span.classList.add("close");
    close_span.onclick = del_task;
    const span_txt = document.createTextNode("\u00D7");
    close_span.appendChild(span_txt);

    header_div.appendChild(close_span);

    const desc_div = document.createElement("div");
    desc_div.setAttribute("id","description");
    desc_div.innerHTML = input_desc;

    task_div.appendChild(header_div);
    task_div.appendChild(desc_div);

    append_task.appendChild(task_div);

}

const close_btns = document.querySelectorAll(".close");
task_submit.addEventListener("click", createTask);


close_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.parentElement.style.display = "none";
    });
});