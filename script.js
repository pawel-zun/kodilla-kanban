$(function() {

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	var boardsContainer = {
		$element: $('#boards-container'),
		addBoard: function(board) {
			this.$element.append(board.$element);
		}
	};

	 $('.create-board').click(function() {
  	var name = prompt('Enter a board name');
  	if ((!(name == false)) && (!(name == null))) {
  	var board = new Board(name);
  	boardsContainer.addBoard(board);
	  } else if (name == false) {
	  	alert('Error! New board must be named.');
	  };
  });

	function Board(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createBoard();

		function createBoard() {
			var $board = $('<div>').addClass('board');
			var $boardTitle = $('<h1>').text(self.name);
			var $boardAddColumn = $('<button>').addClass('add-card').text('Add a column');
			var $boardDelete = $('<button>').addClass('btn-delete').text('Delete board');
			var $columnContainer = $('<div>').addClass('column-container');


			$boardDelete.click(function() {
				if (confirm('Are you sure you want to delete this board?')) {
					self.removeBoard();
				}
			});

			$boardAddColumn.click(function() {
				self.addColumn(new Column(prompt('Enter the name of the column')));
			});

			$board.append($boardTitle).append($boardAddColumn).append($boardDelete).append($columnContainer);

			return $board;
		}
	}

	Board.prototype = {
		addColumn: function(column) {
			this.$element.children('.column-container').append(column.$element);
			initSortable();
		},
		removeBoard: function() {
			this.$element.remove();
		}
	};

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
  		if ((!(self.name == false)) && (!(self.name == null))) {
				var $column = $('<div>').addClass('column');
				var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
				var $columnCardList = $('<ul>').addClass('column-card-list');
				var $columnDelete = $('<button>').addClass('btn-delete').text('Delete column');
				var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

				$columnDelete.click(function() {
					self.removeColumn();
				});

				$columnAddCard.click(function() {
					self.addCard(new Card(prompt('Enter the name of the card')));
				});

				$column.append($columnTitle).append($columnAddCard).append($columnDelete).append($columnCardList);

				return $column;
			} else if (name == false) {
		  	alert('Error! New column must be named.');
		  };
		};
	};

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			if ((!(self.description == false)) && (!(self.description == null))) {
				var $card = $('<li>').addClass('card');
				var $cardDescription = $('<p>').addClass('card-description').text(self.description);
				var $cardDelete = $('<button>').addClass('btn-delete').text('x');

				$cardDelete.click(function() {
					self.removeCard();
				});

				$card.append($cardDelete).append($cardDescription);

				return $card;
			} else if (self.description == false) {
				alert('Please write down task description');
			};
		};
	};

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	function initSortable() {
  	$('.column-card-list').sortable({
  		connectWith: '.column-card-list',
  		placeholder: 'card-placeholder'
  	}).disableSelection();
  };

  var board1 = new Board('Kanban Board');
  boardsContainer.addBoard(board1);

  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  board1.addColumn(todoColumn);
  board1.addColumn(doingColumn);
  board1.addColumn(doneColumn);

  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');
  var card3 = new Card('Create multiple boards feature');

  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);

  var board2 = new Board('Skyrim Quests');
  boardsContainer.addBoard(board2);

  var column1 = new Column('To do');
  var column2 = new Column('Done');
  var column3 = new Column('FUS RO DAH');

  board2.addColumn(column1);
  board2.addColumn(column2);
  board2.addColumn(column3);

  var card21 = new Card('All quests');
  var card22 = new Card('Start playing expansions');

  column1.addCard(card22);
  column2.addCard(card21);

})