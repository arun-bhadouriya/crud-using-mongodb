const userTable = document.getElementById("userTable");
const delbtn = document.querySelectorAll(".fa-trash-alt");
const updateForm = document.getElementById("updateForm");
function openNav() {
	document.getElementById("showForm").style.width = "100%";
	// document.getElementById("showEditForm").style.width = "100%";
}
function openEditNav() {
	// document.getElementById("showForm").style.width = "100%";
	document.getElementById("showEditForm").style.width = "100%";
}

function closeNav() {
	document.getElementById("showForm").style.width = "0%";
	// document.getElementById("showEditForm").style.width = "0%";
}
function closeEditNav() {
	// document.getElementById("showForm").style.width = "0%";
	document.getElementById("showEditForm").style.width = "0%";
}

fetch("http://localhost:3500/users")
	.then((data) => data.json())
	.then((x) => {
		//add each user into the dom
		let markup = "";
		let y = 0;
		x.forEach((user) => {
			// console.log(user);
			markup += `<tr>
				<td>${++y}</td>
				<td>${user.name}</td>
				<td>${user.email}</td>
				<td>${user.contact}</td>
				<td>${user.address}</td>
				<td><i class="el far btn fa-trash-alt"></i></td>
				<td><i  class="el fas btn fa-edit"></i></td>
			</tr>`;
		});
		userTable.innerHTML = markup;
		const delbtn = document.querySelectorAll(".fa-trash-alt");
		const updateBtn = document.querySelectorAll(".fa-edit");
		//add eventlistener to delete on all delete options
		// console.log(delbtn);
		delbtn.forEach((el) => {
			el.addEventListener("click", () => {
				// e.preventDefault();
				console.log("clicked");
				const email = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();
				console.log(email);
				fetch(`https://ccrruudd.herokuapp.com/user/${email}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: null, //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
				}).then(() => {
					window.location.reload();
				});
			});
		});

		updateBtn.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const user_contact =
					e.target.parentElement.previousElementSibling.previousElementSibling
						.previousElementSibling.textContent;

				const user_mail =
					e.target.parentElement.previousElementSibling.previousElementSibling
						.previousElementSibling.previousElementSibling.textContent;
				// console.log("click", user_contact, user_mail);
				updateForm.innerHTML = ShowupdateForm(user_contact, user_mail);
				openEditNav();
			});
		});
	});

// <!-- //edit form -->
const ShowupdateForm = (user_contact, user_mail) => {
	return `<div class="form overlay" id="showEditForm">
<a href="javascript:void(0)" class="closebtn" onclick="closeEditNav()"
	>&times;</a
>
<form action="/user/update/${user_mail}/${user_contact}" method="post">
	<!-- <input type="text" name="id" placeholder="id" /> -->
	<input type="text" id="updateName" name="name" placeholder="name" />
	<input type="text" id="updateEmail" name="email" placeholder="email" />
	<input
		type="text"
		id="updateContact"
		name="contact"
		placeholder="contact number"
	/>
	<input
		type="text"
		id="updateAddress"
		name="address"
		placeholder="address"
	/>
	<button
		type="submit"
		class="btn"
		id="update"
		style="width: 95%; border-radius: 10px"
	>
		Update
	</button>
</form>
</div>`;
};
