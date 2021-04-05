
// анимация полных хранилищ
function repositoryAnimation(): void {
  
  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 5 && territory.repository) {

      let max: number = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === territory.improve).milkStorage;
      
      if (max === territory.volume) {

        let scale: number = territory.repository.scale;

        if (territory.repository.increase) {

          scale += 0.002;
          if (scale >= 1.05) territory.repository.increase = false;

        } else {

          scale -= 0.002;
          if (scale <= 1) territory.repository.increase = true;

        }

        territory.repository.setScale(scale);

      } else if (territory.repository.scale !== 1) {

        territory.repository.scale = 1;

      }

    }

  }

}

export {
  repositoryAnimation,
}
