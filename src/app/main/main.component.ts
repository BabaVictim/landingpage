import { Component, numberAttribute, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private renderer: Renderer2) { }

  temperatureIcon: String = "normal.png"
  temperature: String = "loading.."
  searchQuery: string = ''
  searchRecommendations: any = []
  showRecommendations: boolean = true
  sbbData: any = []
  theme: string = ""
  shortcuts: any = []
  coins: Array<any> = []
  config: any
  selectedSpan: string = "24h"
  menus: Array<any> = []
  exampleSettings: any = [{ "name": "wallpaper.json", "content": "{\n  \"urls\": [\n    \"assets/wallpapers/1.jpg\",\n    \"assets/wallpapers/2.jpg\",\n    \"assets/wallpapers/3.jpg\",\n    \"assets/wallpapers/4.jpg\",\n    \"assets/wallpapers/5.jpg\",\n    \"assets/wallpapers/6.jpg\",\n    \"assets/wallpapers/7.jpg\",\n    \"assets/wallpapers/8.jpg\",\n    \"assets/wallpapers/9.jpg\",\n    \"assets/wallpapers/10.jpg\",\n    \"assets/wallpapers/11.jpg\",\n    \"assets/wallpapers/12.jpg\",\n    \"assets/wallpapers/13.jpg\",\n    \"assets/wallpapers/14.jpg\",\n    \"assets/wallpapers/15.jpg\",\n    \"assets/wallpapers/16.jpg\",\n    \"assets/wallpapers/17.jpg\",\n    \"assets/wallpapers/18.jpg\",\n    \"assets/wallpapers/19.jpg\",\n    \"assets/wallpapers/20.jpg\",\n    \"assets/wallpapers/21.jpg\",\n    \"assets/wallpapers/22.jpg\",\n    \"assets/wallpapers/23.jpg\",\n    \"assets/wallpapers/24.jpg\",\n    \"assets/wallpapers/25.jpg\",\n    \"assets/wallpapers/26.jpg\",\n    \"assets/wallpapers/27.jpg\",\n    \"assets/wallpapers/28.jpg\",\n    \"assets/wallpapers/29.jpg\",\n    \"assets/wallpapers/30.jpg\",\n    \"assets/wallpapers/31.jpg\",\n    \"assets/wallpapers/32.jpg\",\n    \"assets/wallpapers/33.jpg\",\n    \"assets/wallpapers/34.jpg\",\n    \"assets/wallpapers/35.jpg\",\n    \"assets/wallpapers/36.jpg\",\n    \"assets/wallpapers/37.jpg\",\n    \"assets/wallpapers/38.jpg\",\n    \"assets/wallpapers/39.jpg\",\n    \"assets/wallpapers/40.jpg\"\n  ],\n  \"blur\": 0\n}" }, { "name": "shortcuts.json", "content": "[\n  {\n    \"name\": \"Dev\",\n    \"href\": \"https://psidevelop.service-now.com/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo-Dev.png\"\n  },\n  {\n    \"name\": \"Prod\",\n    \"href\": \"https://psi.service-now.com/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo-Prod.png\"\n  },\n  {\n    \"name\": \"Test\",\n    \"href\": \"https://psitest.service-now.com/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo-Test.png\"\n  },\n  {\n    \"name\": \"ChatGPT\",\n    \"href\": \"https://chatgpt.com/\",\n    \"icon\": \"assets/shortcutImages/chatGpt.png\"\n  },\n  {\n    \"name\": \"Copilot\",\n    \"href\": \"https://copilot.cloud.microsoft/\",\n    \"icon\": \"https://img.icons8.com/fluent/512/microsoft-copilot.png\"\n  },\n  {\n    \"name\": \"HL Jira\",\n    \"href\": \"https://psich.atlassian.net/jira/software/projects/HL/boards/211\",\n    \"icon\": \"https://cdn.worldvectorlogo.com/logos/jira-1.svg\"\n  },\n  {\n    \"name\": \"DeepSeek\",\n    \"href\": \"https://chat.deepseek.com/\",\n    \"icon\": \"https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png\"\n  },\n  {\n    \"name\": \"Time\",\n    \"href\": \"https://ps4-psi.itesys.ch/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html/?sap-client=100&sap-language=DE#Launchpad-openFLPPage?pageId=Z_HCM_PERSONELLES_ALL&spaceId=Z_MITARBEITER_BASIS\",\n    \"icon\": \"assets/shortcutImages/sap-time.png\"\n  },\n  {\n    \"name\": \"SBB\",\n    \"href\": \"https://sbb.ch/\",\n    \"icon\": \"assets/shortcutImages/sbb.png\",\n    \"function\": \"showSBB\"\n  },\n  {\n    \"name\": \"Intranet\",\n    \"href\": \"https://intranet.psi.ch/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo.png\"\n  },\n  {\n    \"name\": \"Angular\",\n    \"href\": \"http://localhost:4200/\",\n    \"icon\": \"https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png\"\n  },\n  {\n    \"name\": \"Web Console\",\n    \"href\": \"/webconsole/index.html\",\n    \"icon\": \"https://winaero.com/blog/wp-content/uploads/2019/06/WIndows-Terminal-icon.png\",\n\"function\": \"sexyWebConsole\"\n  }\n]" }, { "name": "cryptoCoins.json", "content": "[\n  \"bonk-bonk\",\n  \"btc-bitcoin\",\n  \"sol-solana\",\n  \"ltc-litecoin\",\n  \"bnb-binance-coin\"\n]" }, { "name": "sbbStation.json", "content": "{\n  \"from\": \"psi ost\",\n  \"to\": \"lenzburg\"\n}" }, { "name": "weather.json", "content": "{}" }]
  colorThemes: Array<any> = [{ "name": "darkmode", "set": [{ "name": "--color-one", "color": "rgba(30,30,30,0.75)" }, { "name": "--color-two", "color": "rgba(40,40,40,0.9)" }, { "name": "--color-search", "color": "rgba(40,40,40)" }, { "name": "--shortcut-font", "color": "rgb(255,255,255)" }, { "name": "--shortcut", "color": "rgba(30,30,30,0.75)" }, { "name": "--every-other-font", "color": "rgb(240,240,240)" }] }, { "name": "lightmode", "set": [{ "name": "--color-one", "color": "rgba(240,240,240,0.75)" }, { "name": "--color-two", "color": "rgba(230,230,230,0.9)" }, { "name": "--color-search", "color": "rgba(230,230,230)" }, { "name": "--shortcut-font", "color": "rgb(17,17,17)" }, { "name": "--shortcut", "color": "rgba(102,102,102,0.75)" }, { "name": "--every-other-font", "color": "rgb(0,0,0)" }] }]

  async ngOnInit() {
    // set settings if none set yet
    this.config = localStorage.getItem('settingsJSON')
    if (!this.config) {
      localStorage.setItem('settingsJSON', JSON.stringify(this.exampleSettings))
      this.config = localStorage.getItem('settingsJSON')
    }

    // animation
    setTimeout(() => {
      document.getElementById('shortcutContainer')?.classList.remove('margin-top-anim')
      document.getElementById('searchBarContainer')?.classList.remove('opacity-anim')
    });

    // widgets und so
    this.loadMealPlannerAPI()
    this.loadShortCuts()
    this.loadWallpaper()
    this.loadCryptoCoins();
    this.loadTheme();
    //this.loadWeather();

    // load widgets
    setTimeout(() => {
      this.loadSBBFunction();
      this.loadWebConsoleWidget();
    }, 10);
  }

  async getSearchRecommendations(event: any) {
    const query = (event.target as HTMLInputElement).value;
    var test = await (await fetch('https://suggestqueries.google.com/complete/search?client=firefox&q=' + query)).json()
    this.searchRecommendations = test[1].slice(0, 5)
  }

  async loadSBBFunction() {
    let SBBSettings = this.getSettings('sbbStation.json')
    if (SBBSettings == 'error') return
    this.sbbData = await (await fetch(`https://transport.opendata.ch/v1/connections?from=${SBBSettings.from}&to=${SBBSettings.to}&limit=5`)).json()
    var targetWidget = document.getElementById('sbbWidget') as HTMLElement;
    var targetShortcutContainer = document.getElementById('showSBB') as HTMLElement;
    var targetShortcut = targetShortcutContainer.children[0]
    targetShortcut?.appendChild(targetWidget)

    if (targetShortcut) {
      targetShortcut.addEventListener('mouseover', () => {
        targetWidget.classList.remove('removedWidget')
      });

      targetShortcut.addEventListener('mouseout', () => {
        targetWidget.classList.add('removedWidget')
      });
    }
  }

  async loadWebConsoleWidget() {
    var targetWidget = document.getElementById('webConsoleWidget') as HTMLElement;
    var targetShortcutContainer = document.getElementById('sexyWebConsole') as HTMLElement;
    var targetShortcut = targetShortcutContainer.children[0]

    targetShortcut?.appendChild(targetWidget)

    if (targetShortcut) {
      targetShortcut.addEventListener('mouseover', () => {
        targetWidget.classList.remove('removedWidget')
      });

      targetShortcut.addEventListener('mouseout', () => {
        targetWidget.classList.add('removedWidget')
      });
    }
  }

  changeCryptoTimeStamp(timestamp: string) {
    this.selectedSpan = timestamp
    for (let coin of this.coins) {
      coin.change = coin["change" + timestamp]
    }
    this.coins.sort((a, b) => (b.amount - a.amount) || (b.change - a.change));
  }

  getSettings(settings: string) {
    try {
      let parsedConfig = JSON.parse(this.config)
      return JSON.parse(parsedConfig[parsedConfig.findIndex((shortcut: { name: string; }) => shortcut.name == settings)].content)
    } catch (e) {
      return "error"
    }
  }

  loadWallpaper() {
    let imageSettings = this.getSettings('wallpaper.json')
    if (imageSettings == 'error') return
    let imageUrl = imageSettings.urls[Math.floor(Math.random() * imageSettings.urls.length)]
    var element = document.getElementById('wallpaperDiv')
    this.renderer.setStyle(element, 'background-image', `url("${imageUrl}")`)
    this.renderer.setStyle(element, 'filter', `blur(${imageSettings.blur}px)`)
  }

  loadShortCuts() {
    var shortcuts = this.getSettings('shortcuts.json')
    if (shortcuts == 'error') return
    this.shortcuts = shortcuts
  }

  async loadMealPlannerAPI() {
    let menusNeeded = ["menuOneLunch", "menuTwoLunch", "vegiLunch"]
    let res = await fetch("https://api.psi.ch/mealplanner/data")
    let data = await res.json()
    let allWeeklyMenus = data.week.singleDayTypes
    let weeklyMenus = []
    for (let i = 0; i < menusNeeded.length; i++) {
      weeklyMenus.push(allWeeklyMenus[menusNeeded[i]])
    }
    for (let weeklyMenu of weeklyMenus) {
      this.menus.push(weeklyMenu.filter((object: any) => object.weekIndex == (new Date).getDay() - 1)[0])
    }
    for (let menu of this.menus) {
      menu.main = menu.main.replaceAll('<br>', ' ')
    }
    setTimeout(() => {
      document.getElementById('mealPlannerContainer')?.classList.remove('margin-bottom-anim')
    }, 50);
  }

  async loadCryptoCoins() {
    let coins = this.getSettings('cryptoCoins.json');
    if (coins == 'error') return
    for (let coin of coins) {
      let res = await fetch("https://api.coinpaprika.com/v1/tickers/" + coin.name)
      let data = await res.json()
      if (data.quotes) {
        let courseData = data.quotes.USD

        let amount = Number((courseData.price * (coin.holding ?? 0)).toFixed(2))
        let finalAmount = amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })

        let price = Number(courseData.price.toFixed(6))
        let finalPrice = String(price)
        if (Number(price) > 0.01) {
          price = Number(price.toFixed(2))
          finalPrice = price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        }
        this.coins.push({
          "amount": finalAmount,
          "name": data.name,
          "price": finalPrice,
          "change": courseData.percent_change_24h,
          "change24h": courseData.percent_change_24h,
          "change7d": courseData.percent_change_7d,
          "change30d": courseData.percent_change_30d,
        })
      }
      setTimeout(() => {
        this.coins.sort((a, b) => (b.amount - a.amount) || (b.change - a.change));
        document.getElementById('cryptoContainer')?.classList.remove('margin-bottom-anim')
      }, 50);
    }
  }

  loadTheme() {
    this.theme = localStorage.getItem('theme') ?? ""
    if (this.theme == "") {
      localStorage.setItem('theme', 'darkmode')
      this.theme = "darkmode"
    }
    this.changeTheme(this.theme)
    this.renderer.setStyle(document.body, 'transition', 'color 0.55s ease, background-color 0.55s ease');
  }

  changeTheme(theme: string) {
    this.theme = theme
    localStorage.setItem('theme', theme)
    let colorSet = this.colorThemes.find(singleTheme => singleTheme.name == theme)
    for (let colorTheme of colorSet.set) {
      document.documentElement.style.setProperty(colorTheme.name, colorTheme.color)
    }
  }

  submitRecommendation(query: any) {
    this.searchQuery = query;
    setTimeout(() => {
      const formElement = document.querySelector('form.searchForm') as HTMLFormElement;
      formElement?.submit();
    }, 1);
  }

  sidewaysScroll(event: WheelEvent) {
    var scrollContainer = document.getElementById('shortcutContainer') ?? { "scrollLeft": 0 }

    event.preventDefault(); // Prevent default vertical scrolling
    scrollContainer.scrollLeft += event.deltaY;
  }

  async loadWeather() {
    let weatherSettings = this.getSettings('weather.json')
    if (weatherSettings == 'error') return

    let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${weatherSettings.latitude}&longitude=${weatherSettings.longitude}&current=temperature_2m,rain,snowfall&timezone=auto`)
    let data = await res.json()
    this.temperature = data.current.temperature_2m + " °C"
    switch (true) {
      case -5 > Number(this.temperature):
        this.temperatureIcon = "bhdchalt.png"
        break;
      case 0 > Number(this.temperature):
        this.temperatureIcon = "chalt.png"
        break;
      case 10 > Number(this.temperature):
        this.temperatureIcon = "eher chalt.png"
        break;
      case 15 > Number(this.temperature):
        this.temperatureIcon = "normal.png"
        break;
      case 30 > Number(this.temperature):
        this.temperatureIcon = "warm.png"
        break;
      default:
        this.temperatureIcon = "heiss.png"
        break;
    }
  }
}
