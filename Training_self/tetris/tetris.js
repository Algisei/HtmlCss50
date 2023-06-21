document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const width = 10;
  const height = 20;
  const cellCount = width * height;
  const cells = [];

  // Создаем ячейки игрового поля
  for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cells.push(cell);
      board.appendChild(cell);
  }

  let currentPiece = {
      position: 4,
      shape: [1, 1, 1, 1],
      width: 2,
      height: 2
  };

  // Отображаем текущую фигуру
  function draw() {
      cells.forEach(cell => {
          cell.classList.remove('active');
      });

      currentPiece.shape.forEach((block, index) => {
          if (block) {
              cells[currentPiece.position + index].classList.add('active');
          }
      });
  }

  // Проверяем, может ли фигура двигаться вниз
  function canMoveDown() {
      for (let i = 0; i < currentPiece.shape.length; i++) {
          if (currentPiece.shape[i]) {
              const nextRowIndex = currentPiece.position + width + i;
              if (nextRowIndex >= cellCount || cells[nextRowIndex].classList.contains('active')) {
                  return false;
              }
          }
      }
      return true;
  }

  // Перемещаем фигуру вниз
  function moveDown() {
      if (canMoveDown()) {
          currentPiece.position += width;
          draw();
      }
  }

  // Проверяем, может ли фигура двигаться влево
  function canMoveLeft() {
      for (let i = 0; i < currentPiece.shape.length; i++) {
          if (currentPiece.shape[i]) {
              const nextColumnIndex = currentPiece.position % width - 1 + i;
              if (nextColumnIndex < 0 || cells[currentPiece.position + i].classList.contains('active')) {
                  return false;
              }
          }
      }
      return true;
  }

  // Перемещаем фигуру влево
  function moveLeft() {
      if (canMoveLeft()) {
          currentPiece.position--;
          draw();
      }
  }

  // Проверяем, может ли фигура двигаться вправо
  function canMoveRight() {
      for (let i = 0; i < currentPiece.shape.length; i++) {
          if (currentPiece.shape[i]) {
              const nextColumnIndex = currentPiece.position % width + currentPiece.width + i;
              if (nextColumnIndex >= width || cells[currentPiece.position + i].classList.contains('active')) {
                  return false;
              }
          }
      }
      return true;
  }

  // Перемещаем фигуру вправо
  function moveRight() {
      if (canMoveRight()) {
          currentPiece.position++;
          draw();
      }
  }

  let direction = ''; // Переменная для хранения текущего направления движения фигуры

  // Изменяем направление движения фигуры
  function changeDirection(event) {
      if (event.keyCode === 37 && direction !== 'right') {
          direction = 'left';
          moveLeft();
      } else if (event.keyCode === 38 && direction !== 'down') {
          direction = 'up';
          // Добавьте код для поворота фигуры
      } else if (event.keyCode === 39 && direction !== 'left') {
          direction = 'right';
          moveRight();
      } else if (event.keyCode === 40 && direction !== 'up') {
          direction = 'down';
          moveDown();
      }
  }

  // Обновляем игру каждую секунду
  setInterval(() => {
      moveDown();
  }, 1000);

  // Добавляем обработчик событий для клавиатуры
  document.addEventListener('keydown', changeDirection);

  // Отображаем начальное состояние игры
  draw();
});
