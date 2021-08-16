import "../components/dialog-base/index.js";
import "../components/book-mark/index.js";
import "../components/edit-dialog/index.js";
import "../components/search-box/index.js";
import "../components/top-site-dialog/index.js";
import SettingIcon from "@assets/Setting.svg";
import CheckIcon from "@assets/Check.svg";
import { setShortcutEditable, startAddShortcut, startImportTopSites } from "./shortcuts";
import { clearAllData } from "./storage";

// module js 自带 defer 属性，所以没法在 html 里使用自定义元素
document.getElementsByTagName("main")[0].insertBefore(
	document.createElement("search-box"),
	document.getElementById("bookmarks"),
);

const settingEl = document.getElementById("setting");

function switchToSettingMode() {
	settingEl.innerHTML = "";

	const acceptBtn = document.createElement("button");
	acceptBtn.innerHTML = CheckIcon + "<span>确定</span>";
	acceptBtn.classList.add("primary");
	acceptBtn.onclick = switchToNormalMode;
	settingEl.append(acceptBtn);

	const addBtn = document.createElement("button");
	addBtn.textContent = "添加网站";
	addBtn.onclick = startAddShortcut;
	settingEl.append(addBtn);

	const importBtn = document.createElement("button");
	importBtn.textContent = "导入常用网站";
	importBtn.onclick = startImportTopSites;
	settingEl.append(importBtn);

	const clearBtn = document.createElement("button");
	clearBtn.textContent = "清空存储";
	clearBtn.className = "warning";
	clearBtn.onclick = () => {
		const accept = window.confirm(
			"是否确定要清空本页保存的所有数据？\n" +
			"该过程不可恢复，并且会同步到所有设备。",
		);
		if (accept) {
			clearAllData();
		}
	};
	settingEl.append(clearBtn);

	setShortcutEditable(true);
	document.body.classList.add("editing");
}

function switchToNormalMode() {
	settingEl.innerHTML = "";

	const button = document.createElement("button");
	button.innerHTML = SettingIcon;
	button.title = "进入设置模式";
	button.className = "icon";
	button.onclick = switchToSettingMode;
	settingEl.append(button);

	setShortcutEditable(false);
	document.body.classList.remove("editing");
}

switchToNormalMode();
