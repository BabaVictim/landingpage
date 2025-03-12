import { Component, Renderer2 } from '@angular/core';
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

  constructor(private renderer: Renderer2) {}

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
  exampleSettings: any = [{"name":"wallpaper.json","content":"{\"urls\":[\"assets/wallpapers/1.jpg\",\"assets/wallpapers/2.jpg\",\"assets/wallpapers/3.jpg\",\"assets/wallpapers/4.jpg\",\"assets/wallpapers/5.jpg\",\"assets/wallpapers/6.jpg\",\"assets/wallpapers/7.jpg\",\"assets/wallpapers/8.jpg\",\"assets/wallpapers/9.jpg\",\"assets/wallpapers/10.jpg\",\"assets/wallpapers/11.jpg\",\"assets/wallpapers/12.jpg\"],\"blur\":0}"},{"name":"shortcuts.json","content":"[\n  {\n    \"name\": \"Dev\",\n    \"href\": \"https://psidevelop.service-now.com/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo-Dev.png\"\n  },\n  {\n    \"name\": \"Prod\",\n    \"href\": \"https://psi.service-now.com/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo-Prod.png\"\n  },\n  {\n    \"name\": \"Test\",\n    \"href\": \"https://psitest.service-now.com/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo-Test.png\"\n  },\n  {\n    \"name\": \"ChatGPT\",\n    \"href\": \"https://chatgpt.com/\",\n    \"icon\": \"assets/shortcutImages/chatGpt.png\"\n  },\n  {\n    \"name\": \"DeepSeek\",\n    \"href\": \"https://chat.deepseek.com/\",\n    \"icon\": \"https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png\"\n  },\n  {\n    \"name\": \"Time\",\n    \"href\": \"https://ps4-psi.itesys.ch/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html/?sap-client=100&sap-language=DE#Launchpad-openFLPPage?pageId=Z_HCM_PERSONELLES_ALL&spaceId=Z_MITARBEITER_BASIS\",\n    \"icon\": \"assets/shortcutImages/sap-time.png\"\n  },\n  {\n    \"name\": \"SBB\",\n    \"href\": \"https://sbb.ch/\",\n    \"icon\": \"assets/shortcutImages/sbb.png\",\n\"function\": \"showSBB\"\n  },\n  {\n    \"name\": \"Intranet\",\n    \"href\": \"https://intranet.psi.ch/\",\n    \"icon\": \"assets/shortcutImages/PSI-Logo.png\"\n  }\n]"},{"name":"cryptoCoins.json","content":"[\"bonk-bonk\",\"btc-bitcoin\",\"sol-solana\",\"ltc-litecoin\"]"},{"name":"sbbStation.json","content":"{\n  \"from\": \"psi ost\",\n  \"to\": \"lenzburg\"\n}"}]
  colorThemes: Array<any> = [{"name":"darkmode","set":[{"name":"--color-one","color":"rgba(30,30,30,0.75)"},{"name":"--color-two","color":"rgba(40,40,40,0.9)"},{"name":"--color-search","color":"rgba(40,40,40)"},{"name":"--shortcut-font","color":"rgb(255,255,255)"},{"name":"--shortcut","color":"rgba(30,30,30,0.75)"},{"name":"--every-other-font","color":"rgb(240,240,240)"}]},{"name":"lightmode","set":[{"name":"--color-one","color":"rgba(240,240,240,0.75)"},{"name":"--color-two","color":"rgba(230,230,230,0.9)"},{"name":"--color-search","color":"rgba(230,230,230)"},{"name":"--shortcut-font","color":"rgb(17,17,17)"},{"name":"--shortcut","color":"rgba(102,102,102,0.75)"},{"name":"--every-other-font","color":"rgb(0,0,0)"}]}]

  async ngOnInit(){
    this.config = localStorage.getItem('settingsJSON')
    if(!this.config){
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
    setTimeout(() => {
      this.loadSBBFunction();
    }, 10);
  }

  async getSearchRecommendations(event: any){
    const query = (event.target as HTMLInputElement).value;
    var test = await (await fetch('https://suggestqueries.google.com/complete/search?client=firefox&q=' + query)).json()
    this.searchRecommendations = test[1].slice(0, 5)
  }

  async loadSBBFunction(){
    let SBBSettings = this.getSettings('sbbStation.json')
    if(SBBSettings == 'error') return
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

  changeCryptoTimeStamp(timestamp: string){
    this.selectedSpan = timestamp
    for(let coin of this.coins){
      coin.change = coin["change" + timestamp]
    }
    this.coins.sort((a, b) => Number(b.change) - Number(a.change));
  }

  getSettings(settings: string){
    try{
      let parsedConfig = JSON.parse(this.config)
      return JSON.parse(parsedConfig[parsedConfig.findIndex((shortcut: { name: string; }) => shortcut.name == settings)].content)
    } catch(e) {
      return "error"
    }
  }

  loadWallpaper(){
    let imageSettings = this.getSettings('wallpaper.json')
    if(imageSettings == 'error') return
    let imageUrl = imageSettings.urls[Math.floor(Math.random() * imageSettings.urls.length)]
    var element = document.getElementById('wallpaperDiv')
    this.renderer.setStyle(element, 'background-image', `url("${imageUrl}")`)
    this.renderer.setStyle(element, 'filter', `blur(${imageSettings.blur}px)`)
  }
  
  loadShortCuts(){
    var shortcuts = this.getSettings('shortcuts.json')
    if(shortcuts == 'error') return
    this.shortcuts = shortcuts
  }

  async loadMealPlannerAPI(){
    let menusNeeded = ["menuOneLunch", "menuTwoLunch", "vegiLunch"]
    let res = await fetch("https://api.psi.ch/mealplanner/data")
    let data = await res.json()
    let allWeeklyMenus = data.week.singleDayTypes
    let weeklyMenus = []
    for(let i = 0; i < menusNeeded.length; i++){
      weeklyMenus.push(allWeeklyMenus[menusNeeded[i]])
    }
    for(let weeklyMenu of weeklyMenus){
      this.menus.push(weeklyMenu.filter((object: any) => object.weekIndex == (new Date).getDay() -1)[0])
    }
    for(let menu of this.menus){
      menu.main = menu.main.replaceAll('<br>', ' ')
    }
    setTimeout(() => {
      document.getElementById('mealPlannerContainer')?.classList.remove('margin-bottom-anim')
    }, 50);
  }

  async loadCryptoCoins(){
    var coins = this.getSettings('cryptoCoins.json');
    if(coins == 'error') return
    for(let coin of coins){
      let res = await fetch("https://api.coinpaprika.com/v1/tickers/" + coin)
      let data = await res.json()
      if(data.quotes){
        let courseData = data.quotes.USD
        let price = Number(courseData.price.toFixed(6))
        var finalPrice = String(price)
        if(Number(price) > 0.01){
          price = Number(price.toFixed(2))
          finalPrice = price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        }
        this.coins.push({
          "name": data.name,
          "price": finalPrice,
          "change": courseData.percent_change_24h,
          "change24h": courseData.percent_change_24h,
          "change7d": courseData.percent_change_7d,
          "change30d": courseData.percent_change_30d,
        })
      }
      setTimeout(() => {
        this.coins.sort((a, b) => Number(b.change) - Number(a.change));
        document.getElementById('cryptoContainer')?.classList.remove('margin-bottom-anim')
      }, 50);
    }
  }

  loadTheme(){
    this.theme = localStorage.getItem('theme') ?? ""
    if(this.theme == ""){
      localStorage.setItem('theme', 'darkmode')
      this.theme = "darkmode"
    }
    this.changeTheme(this.theme)
    this.renderer.setStyle(document.body, 'transition', 'color 0.55s ease, background-color 0.55s ease' );
  }

  changeTheme(theme: string){
    this.theme = theme
    localStorage.setItem('theme', theme)
    let colorSet = this.colorThemes.find(singleTheme => singleTheme.name == theme)
    for(let colorTheme of colorSet.set){
      document.documentElement.style.setProperty(colorTheme.name, colorTheme.color)
    }
  }

  submitRecommendation(query: any){
    this.searchQuery = query;
    setTimeout(() => {
      const formElement = document.querySelector('form.searchForm') as HTMLFormElement;
      formElement?.submit();
    }, 1);
  }

  sidewaysScroll(event: WheelEvent){
    var scrollContainer = document.getElementById('shortcutContainer') ?? {"scrollLeft": 0}

    event.preventDefault(); // Prevent default vertical scrolling
    scrollContainer.scrollLeft += event.deltaY;
  }
}
