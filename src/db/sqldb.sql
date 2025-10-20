-- write all the sql code related to sql db connection and creation of tables here

CREATE DATABASE CakeManagementDB;

USE CakeManagementDB;

CREATE TABLE Cake_Orders(
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    DesignId INT NULL, -- Optional design
    Size NVARCHAR(10) NOT NULL CHECK (Size IN ('Small', 'Medium', 'Large')),
    Flavor NVARCHAR(50) NOT NULL,
    Message NVARCHAR(MAX) NULL,
    Status NVARCHAR(30) NOT NULL DEFAULT 'Pending',
    DeliveryDate DATE NOT NULL,
    Price AS 
        CASE 
            WHEN Size = 'Small' THEN 1000
            WHEN Size = 'Medium' THEN 2000
            WHEN Size = 'Large' THEN 3000
            ELSE 0
        END PERSISTED,
    Notes NVARCHAR(MAX) NULL,
    ExtendedDescription NVARCHAR(MAX) NULL,
    SampleImages NVARCHAR(MAX) NULL,     
    ColorPreferences NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 DEFAULT SYSDATETIME()
);


SELECT * FROM Cake_Orders;
DROP TABLE IF EXISTS Cake_Orders;

INSERT INTO Cake_Orders (
    UserId, DesignId, Size, Flavor, Message, Status, DeliveryDate, Notes,
    ExtendedDescription, SampleImages, ColorPreferences
)
VALUES

(1, 2, 'Medium', 'Chocolate', 'Happy Birthday, Tanui!', 'Pending', '2025-10-25', 
 'Include gold sprinkles and floral piping.', 
 'Elegant piping with gold trim', 
 'birthday1.jpg,birthday2.jpg', 'Gold,White'),


(2, NULL, 'Large', 'Vanilla', 'Congratulations!', 'Pending', '2025-11-02', 
 'Pastel roses and initials on top.', 
 'Elegant white base with pastel roses', 
 'wedding1.jpg,wedding2.jpg,wedding3.jpg', 'White,Pink,Pastel Blue'),


(3, 5, 'Small', 'Red Velvet', 'Love You!', 'Pending', '2025-10-30', 
 'Heart-shaped top with red glaze.', 
 'Heart-shaped red velvet with rose accents', 
 'valentine1.jpg', 'Red'),


(4, NULL, 'Medium', 'Lemon', 'Happy 5th Birthday!', 'Pending', '2025-11-05', 
 'Rainbow colors and cartoon stars.', 
 'Cartoon theme with rainbow colors and stars', 
 'kids1.jpg,kids2.jpg', 'Yellow,Blue,Green'),


(5, 3, 'Large', 'Mocha', 'Happy Anniversary!', 'Pending', '2025-11-10', 
 'Chocolate lace with gold accents.', 
 'Elegant chocolate lace design with gold trim', 
 'anniversary1.jpg,anniversary2.jpg', 'Brown,Gold');
