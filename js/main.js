; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '85%' });
	};



	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};


	var screenHeight = function () {

		if ($(window).width() > 768 && !isMobile.any()) {
			$('.js-dt, .js-dtc').css('min-height', $(window).height());
		} else {
			$('.js-dt, .js-dtc').css('min-height', '');
		}
		$(window).resize(function () {
			if ($(window).width() > 768 && !isMobile.any()) {
				$('.js-dt, .js-dtc').css('min-height', $(window).height());
			} else {
				$('.js-dt, .js-dtc').css('min-height', '');
			}
		});

	};

	var countDown = function (year, month, day) {
		simplyCountdown('.simply-countdown-one', {
			year: year,
			month: month,
			day: day
		});
	};

	var setDate = function () {
		var d = new Date();
		countDown(d.getFullYear(), d.getMonth() + 2, d.getDay());
	}

	$('#set_date').on('click', function () {
		// 入力フォームから値取得
		var text = $('#date').val();
		$('#date').val('');

		// 正規表現で数値を分解&適切かどうか判断
		var pattern = /^\d*\/\d*\/\d*$/;
		if (text.match(pattern) != null) {
			var split_pattern = /[\/\.\-]/;
			var date = text.split(split_pattern).map(str => parseInt(str, 10));

			// タイマー設定を更新して表示
			$('.simply-countdown-one').text('');
			countDown(date[0], date[1], date[2]);
		}
		else {
			alert("入力形式が違います");
		}
	});
	var myChart
	// var graph = '<canvas id="myChart" style="width: 100%; height: 500px;"></canvas>';
	var print_graph = function () {
		if(!myChart){
			var ctx = document.getElementById("myChart");
			myChart = new Chart(ctx, {
			// new Chart(ctx, {
				type: 'radar', // チャートのタイプ
				data: { // チャートの内容
					labels: ["html", "css", "js", "bootstrap", "ruby"],
					datasets: [{
						label: '学習進捗',
						data: data,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderWidth: 1
					}]
				},
				options: {
					scale: {
						ticks: {
							suggestedMin: 0
						},
						scaleLabel: {
							fontSize: 100
						}
					}
				}
			});
		}
		else{
			myChart.data.datasets[0].data = data;
			myChart.update();
		}
	};
	
	var data = Array(5);
	data.fill(0);
	$("#html").click(function () {
		data[0] += 1;
		print_graph();
	});
	$("#html-").click(function () {
		data[0] -= 1;
		print_graph();
	});
	$("#css").click(function () {
		data[1] += 1;
		print_graph();
	});
	$("#css-").click(function () {
		data[1] -= 1;
		print_graph();
	});
	$("#js").click(function () {
		data[2] += 1;
		print_graph();
	});
	$("#js-").click(function () {
		data[2] -= 1;
		print_graph();
	});
	$("#bootstrap").click(function () {
		data[3] += 1;
		print_graph();
	});
	$("#bootstrap-").click(function () {
		data[3] -= 1;
		print_graph();
	});
	$("#ruby").click(function () {
		data[4] += 1;
		print_graph();
	});
	$("#ruby-").click(function () {
		data[4] -= 1;
		print_graph();
	});

	$(function () {
		contentWayPoint();
		loaderPage();
		screenHeight();
		setDate();
		print_graph();
	});

}());