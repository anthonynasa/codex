package main

import (
	"bubble/conf"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
	// 使用配置初始化生成器
	g := gen.NewGenerator(gen.Config{
		OutPath:        "./dal/query",
		Mode:           gen.WithDefaultQuery | gen.WithoutContext,
		FieldNullable:  true,
		FieldCoverable: true,
	})

	// 初始化 *gorm.DB 实例
	conf.InitMysql()
	// 使用上面的 `*gorm.DB` 实例来初始化生成器，
	// 使用 `GenerateModel/GenerateModelAs` 时需要从数据库生成结构
	g.UseDB(conf.DB)

	// 自定义字段的数据类型
	// 统一数字类型为int64,兼容protobuf和thrift
	dataMap := map[string]func(detailType gorm.ColumnType) (dataType string){
		// "数据库中的类型": func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		//  "tinyint": mysql的bool
		// "tinyint":   func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		"smallint":  func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		"mediumint": func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		"bigint":    func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		"int":       func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		// sqlite的 INTEGER
		"INTEGER": func(detailType gorm.ColumnType) (dataType string) { return "int64" },
	}
	// 要先于`ApplyBasic`执行
	g.WithDataTypeMap(dataMap)

	// Generate default DAO interface for those specified structs: 为那些指定的结构生成默认的 DAO 接口
	// g.ApplyBasic(model.Customer{}, model.CreditCard{}, model.Bank{}, model.Passport{})

	// 设置要生成的表
	g.ApplyBasic(
		g.GenerateModel("todo"),
	)
	g.Execute()
}
